'use strict';
const RootRt = require('express').Router();

const { AdminCtrl } = require('../controllers');

RootRt.post('/v1/admin/login', AdminCtrl.login);
RootRt.post('/v1/admin/teacher', AdminCtrl.addTeacher);
RootRt.delete('/v1/admin/teacher/:_id', AdminCtrl.removeTeacher);
RootRt.post('/v1/admin/course', AdminCtrl.addCourse);
RootRt.delete('/v1/admin/course/:_id', AdminCtrl.removeCourse);

module.exports = RootRt;
