const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1> ExpressJS </h1>");
});

/** Set a static folder */
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(` Server started running on : ${PORT}`);
});
