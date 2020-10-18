const yup = require('yup');

const {User} = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll({limit: 10});

            return res.status(200).json({users});
        }
        catch (error) {
            return res.status(400).json({message: 'cannot list users'});
        }
    },

    async add(req, res) {
        try {
            const userSchema = yup.object().shape({
                login: yup
                    .string()
                    .required()
                    .trim()
                    .max(50),
                password: yup
                    .string()
                    .required()
                    .max(100),
            });

            const data = userSchema.validateSync(req.body);

            const user = await User.create(data);

            return res.status(200).json({user});
        }
        catch (error) {
            return res.status(400).json({message: 'cannot add user'});
        }
    },

    async edit(req, res) {
        try {
            const {id} = req.params;

            const userSchema = yup.object().shape({
                login: yup
                    .string()
                    .required()
                    .trim()
                    .max(50),
                password: yup
                    .string()
                    .notRequired()
                    .max(100),
            });

            const data = userSchema.validateSync(req.body);

            const user = await User.update(data, {
                returning: true,
                plain: true,
                where: {id},
            });

            return res.status(200).json({user});
        }
        catch (error) {
            return res.status(400).json({message: 'cannot update user'});
        }
    },
};
