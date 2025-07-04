import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainForm from "@/components/main-form";

export default function Home() {
  return (
    <Card className="h-full min-w-2xl">
      <CardHeader>
        <CardTitle>Main form</CardTitle>
        <CardDescription>Fill in all fields within this form.</CardDescription>
      </CardHeader>
      <CardContent>
        <MainForm />
      </CardContent>
    </Card>
  );
}
