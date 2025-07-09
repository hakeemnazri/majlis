import z from "zod";

export const ticketSchema = z.object({
  ticketName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).nullable(),
  ticketDescription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).nullable(),
  ticketPrice: z.coerce.number().min(1, {
    message: "Price must be at least RM1.",
  }).nullable(),
  ticketQuantity: z.coerce.number().min(1, {
    message: "Quantity must be at least 1.",
  }).nullable(),
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
    category: z.union([z.enum(["premium", "general", "infaq", "preview"],{
      required_error: "Category is required.",
    }),
    z.literal("")
  ]),
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
    registerTickets: z.array(ticketSchema).min(1, {
      message: "Tickets must be at least 1.",
    }).nullable(),
  })
  .refine((data) => {
    if (data.category === "infaq") {
      data.frequency = null;
    }
    if (data.category !== "infaq") {
      data.donationTarget = null;
    }

    if(data.category !== "premium"){
      data.registerTickets = null
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
