// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const User = require('../models/user');

async function register(req, res) {
    try {
        console.log('vào register')
        console.log('Body', req.body);
        const { email, role, name, phone, password } = req.body;
        // Kiểm tra user có email tồn tại chưa
        const checkUser = await User.findOne({ where: { email: email } });
        // Đã có tài khoản
        if (checkUser) {
            return res.status(401).json({
                success: false,
                message: 'Email already in use!'
            });
        }

        const uid = role.slice(0, 2).toUpperCase() + uuidv1()
        const hashedPassword = await bcrypt.hash(password, 10);
        // Tạo user mới
        const user = await User.create({ id: uid, email: email, role: role, name: name, phone: phone, password: hashedPassword, avatar: req.file ? req.file.path : null });

        res.status(201).json({
            success: true,
            message: 'User registered successfully', user: { id: user.id, name: user.name, phone: user.phone, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

async function login(req, res) {

    try {
        console.log('Vào log in');
        // Lấy email và password từ body
        const { email, password } = req.body;
        console.log('Body', email);
        // Tìm trong database
        const user = await User.findOne({ where: { email: email } });
        // Không tìm thấy user
        if (!user) {
            console.log('user not exist');
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials - User not exists'
            });
        }
        // Kiểm tra password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials - Password is not correct'
            });
        }

        const token = jwt.sign({ id: user.id }, 'secret_key');

        res.status(200).json({
            success: true,
            jwt: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
        throw error;
    }
}

const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated' });

    }
    // Tách token từ header
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secret_key');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Could not decode the token' });
    };

    if (!decodedToken) {
        res.status(401).json({ message: 'Unauthorized' });
    } else {
        res.status(200).json({ message: 'Authenticated' });
    };
}

const signout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}
module.exports = {
    register,
    login,
    isAuth,
    signout,
};
