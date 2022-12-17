const controller = require("./controller");
module.exports = app => {
    const controller = require("./controller");
    const router = require("express").Router();

    router.post("/", controller.create);
    router.get("/count", controller.count);

    app.use("/api/vote", router);
};