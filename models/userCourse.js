const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    },
}, { timestamps: true });

const UserCourse = mongoose.model('UserCourse', courseSchema);

module.exports = { UserCourse };
