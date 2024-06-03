export default function GreetingMessage() {
  const currentHours = new Date().getHours();
  let greeting;
  if (currentHours < 12) greeting = "Good morning";
  else if (currentHours < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <h1 className="my-6 sm:text-[2.25rem] text-2xl">
      <span className="text-stone-400">{greeting}, </span>John
    </h1>
  );
}
