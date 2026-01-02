"use client";

import { createProjectApi } from "@/api/projectApi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  status: z.enum(["active", "completed", "archived"]),
});

type FormDataProject = z.infer<typeof projectSchema>;

export default function ProjectDialog({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProject>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "active",
    },
  });

  const onSubmit = async (data: FormDataProject) => {
    try {
      const res = await createProjectApi(data);
      if (res.status === true) {
        toast.success("Project created successfully!");
        reset();
        setOpen(false);
        onCreated();
      }
    } catch (err) {
      toast.error("Create project failed");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white">
          Create Project
        </button>
      </Dialog.Trigger>

      <Dialog.Overlay className="fixed inset-0 bg-black/50" />

      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 w-full max-w-md">
        <Dialog.Title className="text-xl font-bold mb-4">
          Create Project
        </Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Project Name"
              className="border p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="Project Description"
              className="border p-2 rounded w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("status")}
              className="border p-2 rounded w-full"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Dialog.Close asChild>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </Dialog.Close>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
