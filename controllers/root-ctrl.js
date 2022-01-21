'use strict';
class RootCtrl {
    static async getMany(req, res) {
        return res.status(200).json({ message: 'get all data' });
    }

    static async post(req, res) {
        return res.status(200).json({ message: 'get all data' });
    }
}

module.exports = {
    RootCtrl,
};
