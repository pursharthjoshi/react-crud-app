const { body, validationResult } = require('express-validator');
const { login } = require('../auth');
const User = require('../models/user');

exports.login = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    }
    login(req, res, next);
};

exports.register = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    }

    try {
        const { phone, name, email, password, address } = req.body;
        const user = await User.create({
            phone,
            name,
            email,
            password,
            address
        });
        if (user)
            login(req, res, next);
    } catch (err) {
        next(err);
    }
};


exports.updateProfile = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    }
    let data = req.body;
    delete data.email;
    try {
        const user = await User.findOneAndUpdate(req.body.email, {
            ...data
        }, {
            new: true
        });
        res.status(200).json({ success: true, message: "Profile updated!", user });
    } catch (err) {
        next(err);
    }
};

exports.getProfile = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    }
    try {
        const user = await User.findOne(
            {
                _id: req.user.id,
            });
        if (user) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(200).json({ success: false });
        }
    } catch (err) {
        next(err);
    }
};

exports.findAllUsers = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    }

    try {
        let query = {
            _id: { $ne: req.user.id },
        };
        const users = await User.find(query, {
            role: 0,
            _id: 0,
            otp: 0,
        }).sort({ updated: -1 });
        res.status(201).json({ success: true, users });
    } catch (err) {
        next(err);
    }
};

exports.destroy = async (req, res, next) => {
    try {
        let id = req.user.id
        await User.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Account deleted !" })
    } catch (err) {
        next(err);
    }
};

exports.loginValidate = (method) => {
    const errors = [
        body('email')
            .exists()
            .withMessage('is required')

            .isLength({ min: 1 })
            .withMessage('cannot be blank')

            .custom((value) => value.trim() === value)
            .withMessage('cannot start or end with whitespace'),

        body('password')
            .exists()
            .withMessage('is required')

            .isLength({ min: 1 })
            .withMessage('cannot be blank')

            .isLength({ min: 6 })
            .withMessage('must be at least 6 characters long')

            .isLength({ max: 72 })
            .withMessage('must be at most 72 characters long'),
    ];
    return errors;
};

exports.userValidate = (method) => {
    const errors = [
        body('phone')
            .exists()
            .withMessage('is required')

            .isLength({ min: 10 })
            .withMessage('cannot be less than 10')

            .isLength({ max: 10 })
            .withMessage('cannot be more than 10')

            .custom((value) => value.trim() === value)
            .withMessage('cannot start or end with whitespace')

            .withMessage('Invaild mobile no.'),
    ];

    return errors;
};

exports.registerValidate = (method) => {
    const errors = [
        body('phone')
            .exists()
            .withMessage('is required')

            .isLength({ min: 10 })
            .withMessage('cannot be less than 10')

            .isLength({ max: 10 })
            .withMessage('cannot be more than 10')

            .custom((value) => value.trim() === value)
            .withMessage('cannot start or end with whitespace')

            .withMessage('Invaild email'),

        body('name')
            .exists()
            .withMessage('is required')

            .isLength({ min: 1 })
            .withMessage('cannot be blank')

            .isLength({ max: 32 })
            .withMessage('must be at most 32 characters long')

            .custom((value) => value.trim() === value)
            .withMessage('cannot start or end with whitespace'),

        body('password')
            .exists()
            .withMessage('is required')

            .isLength({ min: 1 })
            .withMessage('cannot be blank')

            .isLength({ min: 6 })
            .withMessage('must be at least 6 characters long')

            .isLength({ max: 72 })
            .withMessage('must be at most 72 characters long'),
    ];

    if (method === 'register') {
        errors.push(
            body('email').custom(async (email) => {
                const exists = await User.countDocuments({ email });
                if (exists) throw new Error('User already exists');
            })
        );
    }

    return errors;
};