const mongoose = require('mongoose')

const election = mongoose.model('election', {
    position: {
        type: String
    },
    candidate_name: {
        type: String
    },
    party_name: {
        type: String
    }
});

module.exports = election