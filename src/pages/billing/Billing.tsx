import { useUser } from "../../context/UserContext";

const Billing = () => {
  const { user } = useUser();

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Billing</h1>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Welcome {user?.username}</h2>

        <p className="mt-2 text-gray-600">Store : {user?.store_name}</p>

        <p className="text-gray-600">Role : {user?.role}</p>
      </div>
      <div className="mt-6 flex gap-4 flex-wrap">
        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          Create Bill
        </button>

        {user?.role === "owner" && (
          <>
            <button className="rounded-lg bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600">
              Edit Bill
            </button>

            <button className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700">
              Delete Bill
            </button>
          </>
        )}

        {user?.role === "staff" && (
          <button className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700">
            Print Bill
          </button>
        )}
      </div>
    </div>
  );
};

export default Billing;
