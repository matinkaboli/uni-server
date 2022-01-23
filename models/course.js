const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    vahed: {
        type: String,
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };
