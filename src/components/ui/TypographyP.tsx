import { cn } from "@/lib/utils";
import React from "react";

type TypographyPProps = {
  children: React.ReactNode;
  className?: string;
};

function TypographyP({ children, className }: TypographyPProps) {
  return (
    <p className={cn(`leading-7 [&:not(:first-child)]:mt-6 text-sm`, className)}>
      {children}
    </p>
  );
}

export default TypographyP;
