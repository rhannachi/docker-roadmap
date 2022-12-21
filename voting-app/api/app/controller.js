const amqplib =  require('amqplib/callback_api')
const db = require("./infra");
const Voting = db.voting;
const Op = db.Sequelize.Op;

// Create and Save a new Vote
exports.create = async (req, res) => {
    try {
        if (!req?.body?.candidate) {
            res.status(400).send({
                error: "Condidate can not be empty"
            });
            return
        }

        const data = await Voting.create({ candidate: req.body.candidate })
        res.send(data)

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the vote."
        });
    }
};

// Find a single Vote with candidate
exports.count = async(req, res) => {
    try {
        sendValue("balaaa balaaa blaaaaaa !!!!")
        if (!req?.query?.candidate) {
            res.status(400).send({
                error: "Condidate can not be empty"
            });
            return
        }

        const data = await Voting.findAll({
            where: { candidate: req.query.candidate }
        })

        res.send({ count: data.length })

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while count the vote."
        });
    }
};

const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME

const sendValue = (value) => {
    const RABBITMQ_URI = process.env.RABBITMQ_URI
    amqplib.connect(RABBITMQ_URI, (err, connection) => {
        if (err) process.exit();
        connection.createChannel(async (error, channel) => {
            if (error) {
                console.error(error);
                process.exit();
            } else {
                channel.assertQueue(QUEUE_NAME, {durable: false});
                channel.sendToQueue(QUEUE_NAME, Buffer.from(value.toString()));
                console.info();
                console.info(`===> Send To Queue - ${QUEUE_NAME}`);
                console.info();
            }
        });
    });
}
