import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type {
  Staff,
  StaffPayload,
  UpdateStaffPayload,
} from "../../types/staff";
import {
  addStaff,
  updateStaff,
  checkUsernameExists,
  checkUsernameExistsExceptCurrent,
} from "../../services/staffService";
import { useUser } from "../../context/UserContext";

interface StaffModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  staff: Staff | null;
  isEditing: boolean;
}

const StaffModal = ({
  open,
  onClose,
  onSuccess,
  staff,
  isEditing,
}: StaffModalProps) => {
  const { user } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing && staff) {
      setUsername(staff.username);
      setPassword("");
      setStatus(staff.status);
    } else {
      setUsername("");
      setPassword("");
      setStatus("Active");
    }
  }, [staff, isEditing, open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!user) return;

    if (!username.trim()) {
      toast.error("Username is required.");
      return;
    }

    if (!isEditing && !password.trim()) {
      toast.error("Password is required.");
      return;
    }

    try {
      setSaving(true);

      if (!isEditing) {
        const exists = await checkUsernameExists(username.trim());

        if (exists) {
          toast.error("Username already exists.");
          return;
        }

        const payload: StaffPayload = {
          username: username.trim(),
          password,
          status,
        };

        await addStaff(user.id, user.store_name, payload);

        toast.success("Staff added successfully.");
      } else {
        if (!staff) return;
        const exists = await checkUsernameExistsExceptCurrent(
          username.trim(),
          staff.id,
        );

        if (exists) {
          toast.error("Username already exists.");
          return;
        }

        const payload: UpdateStaffPayload = {
          username: username.trim(),

          status,
        };

        if (password.trim()) {
          payload.password = password;
        }

        await updateStaff(staff.id, payload);

        toast.success("Staff updated successfully.");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Staff" : "Add Staff"}
          </h2>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium">Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEditing ? "Add new password" : "Enter password"}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Active" | "Inactive")
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {saving ? "Saving..." : isEditing ? "Update Staff" : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
