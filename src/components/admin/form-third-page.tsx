import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import { cn } from "@/lib/utils";
import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { QUESTION_OPTIONS } from "@/lib/constants/admin.constant";

function FormThirdPage() {
  const { form } = useBuildEventContext();
  return (
    <>
      {/* -------------------------- */}
      {/* Short & Long Questions */}
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-md font-semibold">Question 1</Label>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-1/2">
                          <SelectValue
                            placeholder="placeholder"
                            className={cn()}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {QUESTION_OPTIONS.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <div className="space-x-2">
                      <Button>Up</Button>
                      <Button>Down</Button>
                      <Button>Remove</Button>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="placeholder"
                      {...field}
                      className={cn()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      {/* -------------------------- */}
      {/* Multiple Questions */}
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-md font-semibold">Question 1</Label>
          </div>
          <div className="space-y-4">
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-1/2">
                            <SelectValue
                              placeholder="placeholder"
                              className={cn()}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {QUESTION_OPTIONS.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <div className="space-x-2">
                        <Button>Up</Button>
                        <Button>Down</Button>
                        <Button>Remove</Button>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="placeholder"
                        {...field}
                        className={cn()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            {/* Options */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 w-full">
                <RadioGroup>
                  <RadioGroupItem className="w-6 h-6" value="" disabled />
                </RadioGroup>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="placeholder"
                          {...field}
                          className={cn("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Remove</Button>
              </div>

              <div className="flex items-center gap-3 w-full">
                <RadioGroup>
                  <RadioGroupItem className="w-6 h-6" value="" disabled />
                </RadioGroup>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="placeholder"
                          {...field}
                          className={cn("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Remove</Button>
              </div>

              <div className="flex items-center gap-3 w-full">
                <RadioGroup>
                  <RadioGroupItem className="w-6 h-6" value="" disabled />
                </RadioGroup>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="placeholder"
                          {...field}
                          className={cn("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Remove</Button>
              </div>

              <Button>Add Option</Button>
            </section>
          </div>
        </CardContent>
      </Card>
      {/* -------------------------- */}
      {/* Checkbox Questions */}
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-md font-semibold">Question 1</Label>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-1/2">
                          <SelectValue
                            placeholder="placeholder"
                            className={cn()}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {QUESTION_OPTIONS.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <div className="space-x-2">
                      <Button>Up</Button>
                      <Button>Down</Button>
                      <Button>Remove</Button>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="placeholder"
                      {...field}
                      className={cn()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Options */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 w-full">
                <Checkbox disabled className="w-6 h-6" />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="placeholder"
                          {...field}
                          className={cn("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Remove</Button>
              </div>

              <div className="flex items-center gap-3 w-full">
                <Checkbox disabled className="w-6 h-6" />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="placeholder"
                          {...field}
                          className={cn("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Remove</Button>
              </div>

              <div className="flex items-center gap-3 w-full">
                <Checkbox disabled className="w-6 h-6" />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="placeholder"
                          {...field}
                          className={cn("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Remove</Button>
              </div>

              <Button>Add Option</Button>
            </section>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default FormThirdPage;
