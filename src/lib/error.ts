import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from "../../generated/prisma/runtime/library";

// Define the possible error codes
type ErrorCode = "ECONNREFUSED" | "ENOTFOUND" | "ETIMEDOUT";

// Define the structure of errors that have a code property
type ErrorWithCode = {
  code: ErrorCode;
  message?: string;
};

export type ErrorResponse = {
    success: false;
    error: string;
    code: string;
    field?: unknown;
    details?: string;
  };

export function handleServerActionError(error: unknown, action: string): ErrorResponse {
  if (process.env.NODE_ENV === "development") {
    console.error("Server Action Error:", {
      error,
      timestamp: new Date().toISOString(),
      action,
    });
  }
  // Handle specific Prisma errors
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          success: false,
          error: "An event with this information already exists",
          code: "DUPLICATE_ERROR",
          field: error.meta || "unknown",
        };

      case "P2003":
        return {
          success: false,
          error: "Referenced record does not exist",
          code: "FOREIGN_KEY_ERROR",
          field: error.meta || "unknown",
        };

      case "P2025":
        return {
          success: false,
          error: "Required record not found",
          code: "RECORD_NOT_FOUND",
        };

      default:
        return {
          success: false,
          error: "Database operation failed",
          code: "DATABASE_ERROR",
        };
    }
  }

  if (error instanceof PrismaClientValidationError) {
    return {
      success: false,
      error: "Invalid data provided",
      code: "VALIDATION_ERROR",
    };
  }

  if (error instanceof PrismaClientInitializationError) {
    return {
      success: false,
      error: "Database connection failed",
      code: "DATABASE_CONNECTION_ERROR",
    };
  }

  // Handle other specific Error instances
  if (error instanceof TypeError) {
    return {
      success: false,
      error: "Invalid data type provided",
      code: "TYPE_ERROR",
    };
  }

  if (error instanceof ReferenceError) {
    return {
      success: false,
      error: "Reference error occurred",
      code: "REFERENCE_ERROR",
    };
  }

  if (error instanceof SyntaxError) {
    return {
      success: false,
      error: "Syntax error in data",
      code: "SYNTAX_ERROR",
    };
  }

  if (!hasErrorCode(error)) {
    return {
      success: false,
      error: "An unknown error occurred",
      code: "UNKNOWN_ERROR",
    };
  }

  // Handle network errors (these are usually Error instances with specific codes)
  if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
    return {
      success: false,
      error: "Database connection failed",
      code: "CONNECTION_ERROR",
    };
  }

  if (error.code === "ETIMEDOUT") {
    return {
      success: false,
      error: "Database operation timed out",
      code: "TIMEOUT_ERROR",
    };
  }

  if (error.code === "ENOTFOUND") {
    return {
      success: false,
      error: "Database server not found",
      code: "SERVER_NOT_FOUND",
    };
  }

  // Don't send sensitive information to client
  if (!(error instanceof Error)) {
    return {
      success: false,
      error: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
    };
  }

  // Handle generic Error instances that don't match specific types
  if (error instanceof Error) {
    // Check for specific error messages that might indicate known issues
    if (error.message.includes("connection")) {
      return {
        success: false,
        error: "Database connection error",
        code: "CONNECTION_ERROR",
      };
    }

    if (error.message.includes("timeout")) {
      return {
        success: false,
        error: "Operation timed out",
        code: "TIMEOUT_ERROR",
      };
    }

    if (
      error.message.includes("permission") ||
      error.message.includes("unauthorized")
    ) {
      return {
        success: false,
        error: "Permission denied",
        code: "PERMISSION_ERROR",
      };
    }

    // Generic Error instance fallback
    return {
      success: false,
      error: "An unexpected error occurred",
      code: "INTERNAL_ERROR",
      ...(process.env.NODE_ENV === "development" && {
        details: error.message,
      }),
    };
  }

  // Final fallback for anything that's not an Error instance
  return {
    success: false,
    error: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
  };
}

// Type guard to check if an error has a code property. This will return a boolean if the shape of the error is ErrorWithCode
function hasErrorCode(error: unknown): error is ErrorWithCode {
  return typeof error === "object" && error !== null && "code" in error;
}
