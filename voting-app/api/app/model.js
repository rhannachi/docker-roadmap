module.exports = (sequelize, Sequelize) => {
    const Voting = sequelize.define("voting", {
        candidate: {
            type: Sequelize.STRING
        },
    });

    return Voting;
};