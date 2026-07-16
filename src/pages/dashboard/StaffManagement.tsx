import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

const StaffManagement = () => {
  const { user } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [staffList, setStaffList] = useState<any[]>([]);

  const fetchStaff = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("role", "staff")
      .eq("owner_id", user?.id);

    setStaffList(data || []);
  };
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Staff Deleted");

    fetchStaff();
  };

  useEffect(() => {
    if (user) {
      fetchStaff();
    }
  }, [user]);

  const handleAddStaff = async () => {
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    // Username already exists?
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (existingUser) {
      toast.error("Username already exists");
      return;
    }

    const { error } = await supabase.from("users").insert({
      store_name: user?.store_name,
      username,
      password,
      role: "staff",
      owner_id: user?.id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Staff Added Successfully");

    setUsername("");
    setPassword("");

    fetchStaff();
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Staff Management</h1>

      <div className="max-w-md rounded-xl bg-white p-6 shadow-lg">
        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Staff Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="mb-6 w-full rounded-lg border p-3"
          type="password"
          placeholder="Staff Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAddStaff}
          className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Add Staff
        </button>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Staff List</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} className="border-b">
                <td className="p-3">{staff.username}</td>
                <td className="p-3 capitalize">{staff.role}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
