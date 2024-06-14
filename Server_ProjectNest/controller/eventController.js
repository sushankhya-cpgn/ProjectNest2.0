const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");
const filterObject = require("../utils/filterObject");
exports.getAllEvents = catchAsync(async (req, res, next) => {
  const allEvents = await Event.find();
  res.status(200).json({
    status: "success",
    total: allEvents.length,
    events: allEvents,
  });
});
exports.addEvent = catchAsync(async (req, res, next) => {
  const eventData = filterObject(req.body, "eventDate", "event");
  const createdEvent = await Event.create(eventData);

  res.status(200).json({
    status: "success",
    event: createdEvent,
  });
});
