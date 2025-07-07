import z from "zod";

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
    category: z.string().min(2, {
      message: "Category must be at least 2 characters.",
    }),
    frequency: z.string().nullable(),
    donationTarget: z.coerce.number().min(1, {
      message: "Donation target must be at least RM1.",
    }).nullable(),
    reference: z.string().min(2, {
      message: "Reference must be at least 2 characters.",
    }),
  }).refine((data) => {
    if(data.category === "infaq"){
      data.frequency = null
    }
    if(data.category !== "infaq"){
      data.donationTarget = null
    }
    return true
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
