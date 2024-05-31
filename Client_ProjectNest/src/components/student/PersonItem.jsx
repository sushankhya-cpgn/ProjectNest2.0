export default function PersonItem({ name, image }) {
  return (
    <div className="flex gap-4  items-center">
      <img className="rounded-full w-8" alt="display" src={`/${image}`}></img>
      <span>{name}</span>
    </div>
  );
}
