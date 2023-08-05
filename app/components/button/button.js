export const Button = ({ children, jetboat }) => {
  return (
    <button
      className={`${
        jetboat ? "bg-oRed" : "bg-primary"
      } px-4 py-2 rounded-lg text-white`}
    >
      {children}
    </button>
  );
};
