"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";

function AddValidationForm() {
  const { form } = useEventDatabaseTableContext();
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Validation name</FormLabel>
              <FormDescription>
                Please enter the validation name.
              </FormDescription>
              <FormControl>
                <Input placeholder="Enter validation name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default AddValidationForm;
