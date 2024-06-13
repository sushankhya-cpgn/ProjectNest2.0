function SuperFeed() {
  return (
    <div className="flex gap-3 flex-col overflow-y-scroll h-4/5 text-text">
      <FeedContent />
      <FeedContent />
      <FeedContent />
      <FeedContent />
      <FeedContent />
      <FeedContent />
      <FeedContent />
      <FeedContent />
      <FeedContent />
    </div>
  );
}

function FeedContent() {
  return (
    <div className="bg-background p-5 rounded-md text-sm sm:text-base">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ex,
      aliquid saepe recusandae vel consectetur reiciendis eligendi eveniet
      voluptatum neque et suscipit, dolore consequuntur minima itaque! Et amet
      odit veritatis.
    </div>
  );
}

export default SuperFeed;
