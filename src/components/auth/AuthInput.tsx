import type { InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

const AuthInput = ({ icon, ...props }: AuthInputProps) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}

      <input
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          py-3
          pl-12
          pr-4
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      />
    </div>
  );
};

export default AuthInput;