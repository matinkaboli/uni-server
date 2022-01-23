'use strict';
const userRt = require('express').Router();

const { UserCtrl } = require('../controllers');

userRt.get('/v1/users', UserCtrl.getOne);
userRt.post('/v1/users', UserCtrl.create);
userRt.post('/v1/users/login', UserCtrl.login);
userRt.put('/v1/users', UserCtrl.edit);
userRt.delete('/v1/users', UserCtrl.delete);

module.exports = userRt;
