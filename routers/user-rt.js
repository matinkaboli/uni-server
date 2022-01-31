'use strict';
const userRt = require('express').Router();

const { UserCtrl } = require('../controllers');

userRt.get('/v1/users', UserCtrl.getOne);
userRt.post('/v1/users', UserCtrl.create);
userRt.post('/v1/users/login', UserCtrl.login);
userRt.put('/v1/users', UserCtrl.edit);
userRt.delete('/v1/users', UserCtrl.delete);
userRt.post('/v1/users/userCourse', UserCtrl.addUserCourse);
userRt.get('/v1/users/userCourse', UserCtrl.getUserCourse);
userRt.delete('/v1/users/userCourse/:_id', UserCtrl.deleteUserCourse);
userRt.get('/v1/users/course', UserCtrl.getCourses);

module.exports = userRt;
