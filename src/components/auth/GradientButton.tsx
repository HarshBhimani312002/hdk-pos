type GradientButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const GradientButton = ({
  text,
  onClick,
  type = "button",
}: GradientButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        py-3
        text-sm
        font-semibold
        text-white
        shadow-lg
        transition
        duration-300
        hover:scale-[1.02]
        hover:shadow-xl
        active:scale-95
        sm:py-3.5
        sm:text-base
      "
    >
      {text}
    </button>
  );
};

export default GradientButton;