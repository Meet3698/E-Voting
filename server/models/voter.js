const mongoose = require('mongoose')

const voter = mongoose.model('voter',{
    voter_name: {
        type: String
    },
    voter_id: {
        type: String
    },
    voted : {
        type : Boolean
    }
});

module.exports = voter