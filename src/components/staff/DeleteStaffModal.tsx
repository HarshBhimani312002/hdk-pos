import type { Staff } from "../../types/staff";

interface DeleteStaffModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  staff: Staff | null;
}

const DeleteStaffModal = ({
  open,
  onClose,
  onConfirm,
  staff,
}: DeleteStaffModalProps) => {
  if (!open || !staff) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-red-600">
            Delete Staff
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {staff.username}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStaffModal;