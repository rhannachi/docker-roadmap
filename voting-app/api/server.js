const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./app/routes")
const db = require("./app/infra");

const ORIGIN = process.env.FRONT_ORIGIN

app.use(cors({ origin:ORIGIN }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
app.get("/", (req, res) => {
    res.json({ message: "From API Welcome !!!" });
});

routes(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});