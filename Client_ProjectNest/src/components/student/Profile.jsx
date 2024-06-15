import { useUser } from "../../contexts/userContext";
export default function Profile() {
  const user = useUser();
  return (
    <div className="flex items-center justify-center gap-3 ">
      <h2 className="font-semibold">{user.user.firstName}</h2>
      <img
        className="rounded-full w-12 "
        alt="display"
        src="/default-avatar.png"
      ></img>
    </div>
  );
}
