'use strict';
const fs = require('fs');
const { objects } = require('../helpers');
const indexRouter = require('express').Router();

fs.readdirSync(__dirname)
    .forEach(file => {
        if (objects.isJSFileAndNotIndex(file)) {
            indexRouter.use(require(`./${file}`));
        }
    });

module.exports = indexRouter;
