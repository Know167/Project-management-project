const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    timeline: {
        type: Object,
        ref:'Task',
    },
});

module.exports = mongoose.model("Project", ProjectSchema);
