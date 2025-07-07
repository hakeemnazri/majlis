import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import MainForm from "./main-form";

function FormCard() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Main form</CardTitle>
          <CardDescription>
            Fill in all fields within this form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MainForm />
        </CardContent>
      </Card>
    </>
  );
}

export default FormCard;
