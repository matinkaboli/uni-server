'use strict';
const rootPath = process.cwd();
require('dotenv-flow').config({ path: `${rootPath}/envs` });

const db = {
    url: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
const port = process.env.PORT;
const jwtSecret = `${process.env.JWT_SECRET}`;

module.exports = {
    db,
    port,
    jwtSecret,
};
