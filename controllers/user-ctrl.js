'use strict';
const { UserSrv } = require('../services/user-srv');
const { objects } = require('../helpers');
const { User } = require('../models/user');
const { crypt } = require('../helpers');
const { JwtSrv } = require('../services');
class UserCtrl {
    static async getMany(req, res) {
        const { query } = req;
        const findCriteria = objects.pick(query, ['name', 'age', 'gender']);
        const options = objects.pick(query, ['limit', 'offset', 'sort']);

        const users = await UserSrv.readMany(findCriteria, options);

        return res.json({
            data: users,
            limit: users.length,
        });
    }

    static async create(req, res) {
        const { body } = req;

        if (!body.name || !body.uniCode || !body.password) {
            return res.status(400).json({
                error: 'API needs name, uniCode and password.',
            });
        }

        if (body.password.length < 8) {
            return res.status(400).json({
                error: 'Password needs to be at least 8 characters.',
            });
        }

        let user;

        try {
            user = await User.create({
                name: body.name,
                uniCode: body.uniCode,
                password: crypt.encrypt(body.password),
            });
        } catch (err) {
            return res.status(400).json({
                error: 'User duplicated.',
            });
        }

        const jwt = JwtSrv.sign(user._id);

        res.json({
            jwt,
        });
    }

    static async login(req, res) {
        const { body } = req;

        if (!body.uniCode || !body.password) {
            return res.status(400).json({
                error: 'API needs uniCode and password.',
            });
        }

        let user;

        try {
            user = await User.findOne({
                uniCode: body.uniCode,
                password: crypt.encrypt(body.password),
            });
        } catch (err) {
            return res.status(400).json({
                error: 'Error. Please try again',
            });
        }

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        const jwt = JwtSrv.sign(user._id);

        res.json({
            jwt,
        });
    }

    static async getOne(req, res) {
        const user = await UserSrv.readOne({ _id: req.params._id });

        return res.json({
            data: user,
        });
    }

    static async post(req, res) {
        const { body } = req;
        const create = Array.isArray(body) ? UserSrv.createMany : UserSrv.createOne;

        const data = await create(body);

        return res.created({
            data,
        });
    }

    static async putOne(req, res) {
        const user = await UserSrv.updateOne(req.params._id, req.body); // change data

        return user
            ? res.accepted({ data: user })
            : res.notFound({ errors: [{ message: 'resource not found' }] });
    }

    static async putMany(req, res) {
        const isModified = await UserSrv.updateMany(req.body);

        return isModified
            ? res.accepted({ data: { message: 'updated user by id' } })
            : res.notFound({ errors: [{ message: 'resource not found' }] });
    }

    static async removeOne(req, res) {
        const isDeleted  = await UserSrv.deleteOne({ _id: req.params._id });

        return isDeleted ? res.noContent() : res.notFound({ errors: [{ message: 'resource not found' }] });
    }

    static async removeMany(req, res) {
        const isDeleted = await UserSrv.deleteMany(req.body.ids);

        return  isDeleted ? res.noContent() : res.notFound({ errors: [{ message: 'resource not found' }] });
    }
}

module.exports = {
    UserCtrl,
};
