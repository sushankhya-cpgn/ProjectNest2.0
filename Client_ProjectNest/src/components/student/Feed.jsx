function Feed() {
  return (
    <div className="flex gap-3 flex-col h-5/6 overflow-y-scroll">
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-background p-5 rounded-md">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ex,
      aliquid saepe recusandae vel consectetur reiciendis eligendi eveniet
      voluptatum neque et suscipit, dolore consequuntur minima itaque! Et amet
      odit veritatis.
    </div>
  );
}

export default Feed;
