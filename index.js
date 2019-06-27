const express = require("express");
const path = require("path");
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;

const logger = require("./middleware/logger");
const members = require("./Members");

/**middleware Logger | Body Parser |URL encoder */
// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** Home Page route */
app.get('/', (req, res) => res.render('index', { title: 'Member App', members }));

app.get("/", (req, res) => {
  res.send("<h1> ExpressJS </h1>");
});

/** Set a static folder */
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));

app.listen(PORT, () => {
  console.log(` Server started running on : ${PORT}`);
});
