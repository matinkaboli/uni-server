'use strict';
const { UserSrv } = require('../services/user-srv');
const { User } = require('../models/user');
const { crypt } = require('../helpers');
const { JwtSrv } = require('../services');
class UserCtrl {
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

        const jwt = JwtSrv.sign(user._id.toString());

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

        const jwt = JwtSrv.sign(user._id.toString());

        res.json({
            jwt,
        });
    }

    static async getOne(req, res) {
        const auth = req.header('Authorization');
        const _id = JwtSrv.verify(auth);

        if (!_id) {
            return res.status(403).json({
                error: 'Forbidden. Key is incorrect.',
            });
        }

        let user;

        try {
            user = await User.findById(_id);
        } catch (err) {
            return res.status(500).json({
                error: 'Internal Server Error.',
            });
        }

        return res.json({
            user,
        });
    }

    static async edit(req, res) {
        const auth = req.header('Authorization');
        const _id = JwtSrv.verify(auth);

        if (!_id) {
            return res.status(403).json({
                error: 'Forbidden. Key is incorrect.',
            });
        }

        let user;

        try {
            user = await User.findById(_id);
        } catch (err) {
            return res.status(500).json({
                error: 'Internal Server Error.',
            });
        }

        if (req.body.name) {
            user.name = req.body.name;
        }

        if (req.body.password && req.body.password.length >= 8) {
            user.password = crypt.encrypt(req.body.password);
        }

        await user.save();

        return res.json({
            message: 'User edited',
        });
    }

    static async delete(req, res) {
        const auth = req.header('Authorization');
        const _id = JwtSrv.verify(auth);

        if (!_id) {
            return res.status(403).json({
                error: 'Forbidden. Key is incorrect.',
            });
        }

        let user;

        try {
            user = await User.findById(_id);
        } catch (err) {
            return res.status(500).json({
                error: 'Internal Server Error.',
            });
        }

        const isDeleted  = await UserSrv.deleteOne({ _id: user._id });

        if (isDeleted) {
            return res.status(200).json({
                message: 'User deleted.',
            });
        }

        return res.status(500).json({
            error: 'User could not be deleted.',
        });
    }
}

module.exports = {
    UserCtrl,
};
