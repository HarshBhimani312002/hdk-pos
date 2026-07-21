import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Users, UserCheck, UserX } from "lucide-react";
import toast from "react-hot-toast";

import { useUser } from "../../context/UserContext";

import type { Staff } from "../../types/staff";

import {
  getStaff,
  deleteStaff,
} from "../../services/staffService";

import StaffTable from "../../components/staff/StaffTable";
import StaffModal from "../../components/staff/StaffModal";
import DeleteStaffModal from "../../components/staff/DeleteStaffModal";

const StaffPage = () => {
  const { user } = useUser();

  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedStaff, setSelectedStaff] =
    useState<Staff | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const fetchStaff = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const data = await getStaff(user.id);

      setStaff(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load staff.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStaff();
    }
  }, [user]);

  const filteredStaff = useMemo(() => {
    return staff.filter((member) =>
      member.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [staff, searchTerm]);

  const totalStaff = staff.length;

  const activeStaff = staff.filter(
    (member) => member.status === "Active"
  ).length;

  const inactiveStaff = staff.filter(
    (member) => member.status === "Inactive"
  ).length;

  const totalPages = Math.ceil(
    filteredStaff.length / ITEMS_PER_PAGE
  );

  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEditStaff = (member: Staff) => {
    setSelectedStaff(member);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteClick = (member: Staff) => {
    setSelectedStaff(member);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedStaff) return;

    try {
      await deleteStaff(selectedStaff.id);

      toast.success("Staff deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedStaff(null);

      if (
        paginatedStaff.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage((page) => page - 1);
      }

      fetchStaff();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete staff.");
    }
  };

  return (
        <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Staff Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your staff members and their access.
          </p>
        </div>

        <button
          onClick={handleAddStaff}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {totalStaff}
              </h2>
            </div>

            <div className="rounded-full bg-blue-100 p-3">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Staff</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeStaff}
              </h2>
            </div>

            <div className="rounded-full bg-green-100 p-3">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive Staff</p>
              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {inactiveStaff}
              </h2>
            </div>

            <div className="rounded-full bg-red-100 p-3">
              <UserX className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search staff by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Staff Table */}
      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">Loading staff...</p>
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">
            No staff found
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or add a new staff member.
          </p>
        </div>
      ) : (
        <StaffTable
          staff={paginatedStaff}
          onEdit={handleEditStaff}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Pagination */}
      {!loading && filteredStaff.length > 0 && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            -
            <span className="font-medium">
              {" "}
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredStaff.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {filteredStaff.length}
            </span>{" "}
            staff members
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Staff Modal */}
      <StaffModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedStaff(null);
        }}
        onSuccess={fetchStaff}
        staff={selectedStaff}
        isEditing={isEditing}
      />

      {/* Delete Staff Modal */}
      <DeleteStaffModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedStaff(null);
        }}
        onConfirm={confirmDelete}
        staff={selectedStaff}
      />
    </div>
  );
};

export default StaffPage;