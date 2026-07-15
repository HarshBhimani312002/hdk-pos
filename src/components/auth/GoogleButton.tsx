import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <button
      type="button"
      className="
        flex
        items-center
        justify-center
        gap-3
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        py-3
        font-medium
        text-gray-700
        transition
        duration-300
        hover:bg-gray-50
        hover:shadow-md
      "
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
};

export default GoogleButton;