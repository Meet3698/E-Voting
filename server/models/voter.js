const mongoose = require('mongoose')

const voter = mongoose.model('voter', {
    voter_name: {
        type: String
    },
    voter_id: {
        type: String
    },
    voted: {
        type: Boolean
    },
    signature: {
        type: String
    },
    key_generated: {
        type: Boolean
    },
    public_key: {
        type: String
    }
});

module.exports = voter