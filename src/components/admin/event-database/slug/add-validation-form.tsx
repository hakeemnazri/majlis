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
import { useDatabaseStore } from "@/stores/admin/databaseStore";

function AddValidationForm() {
  const { eventDatabaseForm } = useEventDatabaseTableContext();
  const { formAction } = useDatabaseStore((state) => state);
  return (
    <Form {...eventDatabaseForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-8"
      >
        { formAction === "add-validation-column" &&
          <FormField
          control={eventDatabaseForm.control}
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
        />}

      </form>
    </Form>
  );
}

export default AddValidationForm;
