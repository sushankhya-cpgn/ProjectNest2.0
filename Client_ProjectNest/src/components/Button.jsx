export default function Button({
  children,
  onClick,
  disabled,
  px = 4,
  py = 2,
}) {
  return (
    <button
      onClick={(e) => onClick()}
      className={`bg-accent/70 transition-all duration-200 ring-2 rounded-md hover:bg-backgroundlight ring-accent/70 px-${px} py-${py} flex items-center justify-center gap-2`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
