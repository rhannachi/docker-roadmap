const controller = require("./controller");
const router = require("express").Router();

module.exports = app => {

    router.post("/", controller.create);
    router.get("/count", controller.count);

    app.use("/api/vote", router);
};