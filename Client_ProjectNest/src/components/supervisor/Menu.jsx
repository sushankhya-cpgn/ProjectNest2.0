import Profile from "./Profile";
import WelcomeMessage from "./WelcomeMessage";
import SearchBar from "../SearchBar";

export default function Menu() {
  return (
    <div className=" text-text">
      <div className="flex flex-row text-stone-100 justify-between ">
        <SearchBar />
        <Profile />
      </div>
      <WelcomeMessage />
    </div>
  );
}
