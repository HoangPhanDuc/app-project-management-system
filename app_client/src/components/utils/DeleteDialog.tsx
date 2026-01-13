"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface DeleteDialogProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export default function DeleteDialog({
  trigger,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item?",
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}: DeleteDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>

          <Dialog.Description className="mt-2 text-sm text-gray-600">
            {description}
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="border border-gray-300 px-4 py-2 text-sm hover:opacity-65 cursor-pointer"
              >
                {cancelText}
              </button>
            </Dialog.Close>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Deleting..." : confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
