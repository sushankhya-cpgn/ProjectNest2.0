import getTechIcon from "../../utils/getTechIcon";

function FindPorjectProjectDetail() {
  //fetch the project proposal from backend

  const interestedPeopel = [
    {
      name: "Mohit Shahi",
      image: "default-avatar.png",
    },
    {
      name: "Sushankhya Chapagain",
      image: "default-avatar.png",
    },
    {
      name: "Ravi Pajiyar",
      image: "default-avatar.png",
    },
  ];
  const techTags = ["React", "Node", "ML/AI"];
  return (
    <div className="p-3 pt-0 overflow-auto flex flex-col gap-4">
      <div className="py-3 sticky top-0 bg-backgroundlight flex justify-between items-center">
        <h1 className=" text-2xl">
          Web3 GoFundMe - Transparent Donation Matching
        </h1>
        <button className=" transition-all duration-200 ring-2 rounded-md hover:bg-backgroundlight ring-accent/70 p-2 bg-accent/70">
          Request <span className="hidden xl:inline">to join</span>
        </button>
      </div>
      <div className="flex justify-between">
        <Profile name={"Mohit Shahi"} image={"default-avatar.png"} />
        <div className="hidden  text-sm md:flex flex-row justify-between items-center gap-2">
          {techTags.map((tag) => (
            <TechnologyTag key={tag} tech={tag} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg">Problem to solve</h2>
        <p className=" text-gray-400 text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
          voluptates ipsum quibusdam porro numquam sapiente. Molestiae dicta
          placeat quisquam veritatis.
        </p>
      </div>
      <div>
        <h2 className="text-lg">Possible solution</h2>

        <p className=" text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
          earum ratione, temporibus quo laborum animi aut est inventore,
          cupiditate fuga cumque accusamus necessitatibus sed praesentium
          accusantium commodi similique voluptatum doloremque illum. Vel, minima
          fuga! Vel, minima fuga! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Tempore, earum ratione, temporibus quo laborum animi
          aut est inventore, cupiditate fuga cumque accusamus necessitatibus sed
          praesentium accusantium commodi similique voluptatum doloremque illum.
          Vel, minima fuga! Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Tempore, earum ratione, temporibus quo laborum animi aut est
          inventore, cupiditate fuga cumque accusamus necessitatibus sed
          praesentium accusantium commodi similique voluptatum doloremque illum.
          Vel, minima fuga!
        </p>
      </div>
      <div>
        <h2 className="text-lg">Resources</h2>
        <p className=" text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
          earum ratione, temporibus quo laborum animi aut est inventore,
          cupiditate fuga cumque accusamus necessitatibus sed praesentium
          accusantium commodi similique voluptatum doloremque illum. Vel, minima
          fuga! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tempore, earum ratione, temporibus quo laborum animi aut est
          inventore, cupiditate fuga cumque accusamus necessitatibus sed
          praesentium accusantium commodi similique voluptatum doloremque illum.
        </p>
      </div>
      <div>
        <h2>These people are interested in the project:</h2>
        <div>
          <ul className="flex flex-col gap-2 mt-2">
            {interestedPeopel.map((person, i) => (
              <li key={i}>
                <Profile name={person.name} image={person.image} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Profile({ name, image }) {
  return (
    <div className="flex gap-4  items-center">
      <img className="rounded-full w-8" alt="display" src={`/${image}`}></img>
      <span>{name}</span>
    </div>
  );
}
function TechnologyTag({ tech }) {
  return (
    <span className="rounded-2xl bg-slate-800 px-3 py-1 flex justify-center items-center gap-2">
      {getTechIcon(tech)}
      {tech}
    </span>
  );
}

export default FindPorjectProjectDetail;
