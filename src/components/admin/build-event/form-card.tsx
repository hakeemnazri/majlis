"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "../../ui/card";
import MainForm from "./main-form";
import BuildFormHeaders from "./build-form-headers";
import { Separator } from "@/components/ui/separator";

function FormCard() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <BuildFormHeaders />
          <Separator />
        </CardHeader>
        <CardContent>
          <MainForm />
        </CardContent>
      </Card>
    </>
  );
}

export default FormCard;
