exports.getAllUsers = (req, res) => {
  //   res.send("<h1>Hello socket</h1>");
  res.status(200).json({
    status: "success",
    message: "this is a message",
  });
};
