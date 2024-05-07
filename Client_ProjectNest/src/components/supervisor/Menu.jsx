import Profile from "./Profile";
import SearchBar from "./SearchBar";

export default function Menu() {
  return (
    <div className="  h-20 rounded-lg text-text flex flex-row justify-between">
      <SearchBar />
      <Profile />
    </div>
  );
}
