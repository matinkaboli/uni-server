'use strict';
const userRt = require('express').Router();

const { UserCtrl } = require('../controllers');

userRt.get('/v1/users', UserCtrl.getOne);
userRt.post('/v1/users', UserCtrl.create);
userRt.post('/v1/users/login', UserCtrl.login);
userRt.put('/v1/users/:_id', UserCtrl.putOne);
userRt.delete('/v1/users/:_id', UserCtrl.removeOne);

module.exports = userRt;
