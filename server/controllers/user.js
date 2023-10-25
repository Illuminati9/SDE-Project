const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email Format. Please Provide a valid Email Address.",
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials. User is not Registered. Please Sign up.",
            });
        }

        if (existingUser.token) {
            return res.status(401).json({
                success: false,
                message: "User is Already logged in.",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (isPasswordCorrect) {
            const payload = {
                email: existingUser.email,
                id: existingUser._id,
                userType: existingUser.userType,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            existingUser.token = token;
            existingUser.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: existingUser,
                message: "Logged in Successfully.",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials. Please check your Email and Password.",
            });
        }

    } catch (error) {
        res.status(500).json({ success: true, message: 'Login Failure. Please try again later.' });
    }
}

const signup = async (req, res) => {

    const { email, password, confirmPassword, firstName, lastName, userType } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        console.log('signup1');

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        console.log('signup2');

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords don\'t match' })
        }

        console.log('signup3');

        let name = `${firstName} ${lastName}`;

        let hashedPassword = await bcrypt.hash(password, 12);

        console.log('signup4');

        const result = await User.create({ email, password: hashedPassword, name, userType });

        console.log('signup5');

        const token = jwt.sign({ email: result.email, id: result._id, userType: userType }, process.env.JWT_SECRET, { expiresIn: "24h" });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        
        result.password = undefined;

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: result,
            message: "Signed up Successful.",
        });


    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!!' });
    }
}

module.exports = { signin, signup };