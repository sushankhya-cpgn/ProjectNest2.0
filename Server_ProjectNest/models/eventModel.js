const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventDate: {
      type: Date,
      required: [true, "date is required to create a event"],
    },
    event: {
      type: String,
      required: [true, "specify the event"],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
