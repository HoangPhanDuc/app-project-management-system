"use client";

import { FormDataProject, projectSchema } from "@/lib/schema/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Mode = "create" | "update";

type Props = {
  mode: Mode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: FormDataProject;
  onSubmit: (data: FormDataProject) => Promise<void>;
};

const defaultValues: FormDataProject = {
  name: "",
  description: "",
  status: "active",
};

export default function ProjectDialog({
  mode,
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProject>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(initialData ?? defaultValues);
    }
  }, [open, initialData, reset]);

  const submitHandler = async (data: FormDataProject) => {
    await onSubmit(data);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />

      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 w-full max-w-md">
        <Dialog.Title className="text-xl text-center font-bold mb-2">
          {mode === "update" ? "Update Project" : "Create Project"}
        </Dialog.Title>

        <Dialog.Description className="text-sm text-gray-500 mb-4">
          {mode === "update"
            ? "Update project information."
            : "Create a new project."}
        </Dialog.Description>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Project Name"
              className="border p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="Project Description"
              className="border p-2 w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <select {...register("status")} className="border p-2 w-full">
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white disabled:opacity-50"
            >
              {isSubmitting
                ? mode === "update"
                  ? "Updating..."
                  : "Creating..."
                : mode === "update"
                  ? "Update"
                  : "Create"}
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
