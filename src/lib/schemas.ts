import z from "zod";

export const ticketSchema = z.object({
  ticketName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .nullable(),
  ticketDescription: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .nullable(),
  ticketPrice: z.coerce
    .number()
    .min(1, {
      message: "Price must be at least RM1.",
    })
    .nullable(),
  ticketQuantity: z.coerce
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
    eventHost: z.string().min(2, {
      message: "Host must be at least 2 characters.",
    }),
    eventImage: z.string().min(2, {
      message: "Image must be at least 2 characters.",
    }),
    category: z.enum(["premium", "general", "infaq", "preview"]),
    frequency: z.string().nullable(),
    donationTarget: z.coerce
      .number()
      .min(1, {
        message: "Donation target must be at least RM1.",
      })
      .nullable(),
    reference: z.string().min(2, {
      message: "Reference must be at least 2 characters.",
    }),
    registerTickets: z
      .array(ticketSchema)
      .min(1, {
        message: "Tickets must be at least 1.",
      })
      .nullable(),
  })
  .refine((data) => {
    if (data.category === "infaq") {
      data.frequency = null;
    }
    if (data.category !== "infaq") {
      data.donationTarget = null;
    }

    if (data.category !== "premium") {
      data.registerTickets = null;
    }
    return true;
  })
  .superRefine((data, ctx) => {
    if (
      data.category !== "infaq" &&
      (!data.frequency || data.frequency.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Frequency is required.",
        path: ["frequency"],
      });
    }

    if (
      data.category === "infaq" &&
      (!data.donationTarget || data.donationTarget < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Value is required and must be at least RM1.",
        path: ["donationTarget"],
      });
    }

    return true;
  });

// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------

const baseFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  eventHost: z.string().min(2, {
    message: "Host must be at least 2 characters.",
  }),
  eventImage: z.string().min(2, {
    message: "Image must be at least 2 characters.",
  }),
  category: z.enum(["premium", "general", "infaq", "preview"]),
  frequency: z.string().nullable(),
  donationTarget: z.coerce
    .number()
    .min(1, {
      message: "Donation target must be at least RM1.",
    })
    .nullish(),
  reference: z.string().min(2, {
    message: "Reference must be at least 2 characters.",
  }),
});

export const strictTicketSchema = z.object({
  ticketName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  ticketDescription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  ticketPrice: z.coerce.number().min(1, {
    message: "Price must be at least RM1.",
  }),
  ticketQuantity: z.coerce.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
});

const strictTicketShape = strictTicketSchema.shape;
const looseTicketSchema = z.object({
  ticketName: strictTicketShape.ticketName.nullish(),
  ticketDescription: strictTicketShape.ticketDescription.nullish(),
  ticketPrice: strictTicketShape.ticketPrice.nullish(),
  ticketQuantity: strictTicketShape.ticketQuantity.nullish(),
});

export const strictSurveyQuestionSchema = z.object({
  id: z.string(),
  type: z.enum(["short answer", "paragraph", "mutliple choice", "checkboxes"]),
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
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
  options: z
  .array(
    z.string().nullish()
  ),
});

export const formSchema2 = (isStrict: boolean) =>
  baseFormSchema
    .extend({
      registerTickets: z
        .array(isStrict ? strictTicketSchema : looseTicketSchema)
        .min(1, {
          message: "Tickets must be at least 1.",
        })
        .nullable(),
      survey: z.array(isStrict ? strictSurveyQuestionSchema : looseSurveyQuestionSchema).min(1, {
        message: "Surveys must be at least 1 question.",
      }),
    })
    .refine((data) => {
      if (data.category === "infaq") {
        data.frequency = null;
      }
      if (data.category !== "infaq") {
        data.donationTarget = null;
      }

      if (data.category !== "premium") {
        data.registerTickets = null;
      }

      return true;
    });
