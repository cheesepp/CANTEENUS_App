// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function register(req, res) {
    try {
        console.log('vào đây')
        const { email, role, name, phone, password } = req.body;
        const checkUser = await User.findOne({ where: { email } });
        if (checkUser) {
           return  res.status(401).json({ 
            success: false,
            message: 'Email already in use!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, role, name, phone, password: hashedPassword });
        res.status(201).json({ 
            success: true,
            message: 'User registered successfully', user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, 'secret_key');
        res.status(200).json({ 
            success: true,
            jwt: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    login,
};
