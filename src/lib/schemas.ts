import z from "zod";

export const ticketSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .nullable(),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .nullable(),
  price: z.coerce
    .number()
    .min(1, {
      message: "Price must be at least RM1.",
    })
    .nullable(),
  quantity: z.coerce
    .number()
    .min(1, {
      message: "Quantity must be at least 1.",
    })
    .nullable(),
});

export const formSchema = z
  .object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    host: z.string().min(2, {
      message: "Host must be at least 2 characters.",
    }),
    mainImage: z.string().min(2, {
      message: "Image must be at least 2 characters.",
    }),
    category: z.enum(["PREMIUM", "GENERAL", "INFAQ", "PREVIEW"]),
    frequency: z.string().nullable(),
    targetDonation: z.coerce
      .number()
      .min(1, {
        message: "Donation target must be at least RM1.",
      })
      .nullable(),
    reference: z.string().min(2, {
      message: "Reference must be at least 2 characters.",
    }),
    tickets: z
      .array(ticketSchema)
      .min(1, {
        message: "Tickets must be at least 1.",
      })
      .nullable(),
  })
  .refine((data) => {
    if (data.category === "INFAQ") {
      data.frequency = null;
    }
    if (data.category !== "INFAQ") {
      data.targetDonation = null;
    }

    if (data.category !== "PREMIUM") {
      data.tickets = null;
    }
    return true;
  })
  .superRefine((data, ctx) => {
    if (
      data.category !== "INFAQ" &&
      (!data.frequency || data.frequency.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Frequency is required.",
        path: ["frequency"],
      });
    }

    if (
      data.category === "INFAQ" &&
      (!data.targetDonation || data.targetDonation < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Value is required and must be at least RM1.",
        path: ["targetDonation"],
      });
    }

    return true;
  });

// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------

const baseFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  host: z.enum(["PKAM", "TURATH"]),
  mainImage: z.string().min(2, {
    message: "Image must be at least 2 characters.",
  }),
  category: z.enum(["PREMIUM", "GENERAL", "INFAQ", "PREVIEW"]),
  frequency: z.string().nullable(),
  targetDonation: z.coerce
    .number()
    .min(1, {
      message: "Donation target must be at least RM1.",
    })
    .nullable(),
  reference: z.string().min(2, {
    message: "Reference must be at least 2 characters.",
  }),
});

export const strictTicketSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least RM1.",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
});

const strictTicketShape = strictTicketSchema.shape;
const looseTicketSchema = z.object({
  id: strictTicketShape.id,
  name: strictTicketShape.name.nullish(),
  description: strictTicketShape.description.nullish(),
  price: strictTicketShape.price.nullish(),
  quantity: strictTicketShape.quantity.nullish(),
});

export const strictSurveyQuestionSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["SHORT_ANSWER", "PARAGRAPH", "MULTIPLE_CHOICE", "CHECKBOXES"]),
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  isRequired: z.boolean(),
  options: z
    .array(
      z.string().min(2, {
        message: "Option must be at least 2 characters.",
      })
    )
    .min(2, {
      message: "Options must be at least 2.",
    }),
});

const strictSurveyShape = strictSurveyQuestionSchema.shape;
const looseSurveyQuestionSchema = z.object({
  id: strictSurveyShape.id,
  type: strictSurveyShape.type,
  question: strictSurveyShape.question,
  isRequired: strictSurveyShape.isRequired,
  options: z.array(z.string().nullish()),
});

export const formSchema2 = (isStrict: boolean) =>
  baseFormSchema
    .extend({
      id: z.string().optional(),
      tickets: z
        .array(isStrict ? strictTicketSchema : looseTicketSchema)
        .nullable(),
      survey: z
        .array(
          isStrict ? strictSurveyQuestionSchema : looseSurveyQuestionSchema
        )
        .min(1, {
          message: "Surveys must be at least 1 question.",
        }),
    })
    .refine((data) => {
      if (data.category === "INFAQ") {
        data.frequency = null;
        data.tickets = null;
      }
      if (data.category !== "INFAQ") {
        data.targetDonation = null;
      }

      if (data.category !== "PREMIUM") {
        data.tickets = null;
      }

      return true;
    });

const surveyInputSchema = z.object({
  input: z.string().min(1, "Required"),
  checkbox: z.array(z.string()).min(1, "Required"),
});

const strictSurveyInputSchema = z.object({
  input: z.string().min(1, "Required"),
  checkbox: z.array(z.string()).min(1, "Required"),
});

const looseSurveyInputSchema = z.object({
  input: z.string(),
  checkbox: z.array(z.string()),
});

export const surveyQuestionsSchema = z.object({
  eventId: z.string(),
  responses: z.array(
    z.object({
      id: z.string(),
      answer: surveyInputSchema,
    })
  ),
});

export const strictSurveyQuestionInputSchema = (isStrict: boolean) =>
  z.object({
    eventId: z.string(),
    responses: z.array(
      z.object({
        id: z.string(),
        answer: isStrict ? strictSurveyInputSchema : looseSurveyInputSchema,
      })
    ),
  });

export const timeFormSchema = z.object({
  month: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
});

export const nameSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  eventId: z.string().min(2, "Event ID is missing."),
});

export const editCheckboxSchema = z.string().min(2, "Event ID is missing.")

export const editInputSchema = z.object({
  id: z.string().min(2, "Input ID is missing."),
  payload: z.string(),
})

export const eventDatabasePaginationSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(10).max(20),
  slug: z.string(),
});