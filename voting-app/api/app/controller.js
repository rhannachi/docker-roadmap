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

