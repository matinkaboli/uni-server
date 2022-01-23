const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = { Teacher };
