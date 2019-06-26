const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const members = require("./Members");
const logger = require("./middleware/logger");

app.use(logger);

app.get("/", (req, res) => {
  res.send("<h1> ExpressJS </h1>");
});

/**Get One Member by ID */
app.get("/api/members/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id} is present.` });
  }
});

app.get("/api/members", (req, res) => res.json(members));

/** Set a static folder */
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(` Server started running on : ${PORT}`);
});
