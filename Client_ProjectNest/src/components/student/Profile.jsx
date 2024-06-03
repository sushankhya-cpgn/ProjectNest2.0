export default function Profile() {
  return (
    <div className="flex items-center justify-center gap-3 ">
      <h2 className="font-semibold">John Doe</h2>
      <img
        className="rounded-full w-12 "
        alt="display"
        src="/default-avatar.png"
      ></img>
    </div>
  );
}
