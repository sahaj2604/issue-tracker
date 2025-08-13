'use client'
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Issue } from "@/app/generated/prisma";
import SimpleMDE from 'react-simplemde-editor'
type IssueFormData = z.infer<typeof issueSchema>;
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) 
        await axios.patch("/api/issues/" + issue.id, data);
      else 
        await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh()
    } catch (error) {
      setError("error occured");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <div>
              <SimpleMDE placeholder="Description" {...field} />
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </div>
          )}
        />

        <Button disabled={isSubmitting}>
          {issue?"Update Issue":"Submit New Issue"}{' '} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
