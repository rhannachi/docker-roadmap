const amqplib =  require('amqplib/callback_api')
const db = require("./infra");
const Voting = db.voting;

// Create and Save a new Vote
exports.create = async (req, res) => {
    try {
        const candidate = req?.body?.candidate

        if (!candidate) {
            res.status(400).send({
                error: "Condidate can not be empty"
            });
            return
        }

        const data = await Voting.create({ candidate })
        res.send(data)

        //** send object to socket project **//
        sendToSocket(await countAll())

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the vote."
        });
    }
};

// Find a single Vote with candidate
exports.count = async(req, res) => {
    try {
        const candidate = req?.query?.candidate

        if (!candidate) {
            res.status(400).send({
                error: "Condidate can not be empty"
            });
            return
        }

        const count = await Voting.count({
            where: { candidate }
        })

        res.send({ count })

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while count the vote."
        });
    }
};

// find all candidate
const countAll = async () => {
    const [results]= await db.sequelize.query("SELECT candidate, COUNT(*) FROM votings GROUP BY candidate")
    return results
}

const sendToSocket = (object) => {
    const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME
    const RABBITMQ_URI = process.env.RABBITMQ_URI
    amqplib.connect(RABBITMQ_URI, (err, connection) => {
        if (err) process.exit();
        connection.createChannel(async (error, channel) => {
            if (error) {
                console.error(error);
                process.exit();
            } else {
                channel.assertQueue(QUEUE_NAME, { durable: false });
                channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(object), 'utf8'));
                console.info();
                console.info(`===> Send message to socket project - ${QUEUE_NAME}`);
                console.info();
            }
        });
    });
}
