const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const indexRoutes = require("./routes/index");

app.set("port", process.env.PORT || 3100);
app.set("json spaces", 2);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));

app.use("/api", indexRoutes);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
