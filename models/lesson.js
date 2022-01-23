const mongoose = require('mongoose');
const { Schema } = mongoose;

const lessonSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Lesson };
