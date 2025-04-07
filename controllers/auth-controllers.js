const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try{
    const {firstname, lastname, email, mobilenumber, age, address, role, password } = req.body;
    const checkExistingUser = await user.findOne({$or : [{email}, {mobilenumber}]});
    if(checkExistingUser){
        return res.status(400).json({
            success : false,
            message : 'User already registered'
        });
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user and save into database
    const newUser = new user({
        firstname,
        lastname,
        email,
        password : hashedPassword,
        mobilenumber,
        age,
        address,
        role : role || 'user'
    });

    //Save the new user
    await newUser.save();

    //check if the new user is registered successfully
    if(newUser){
        return res.status(201).json({
            success : true,
            message : 'User registered successfully'
        });
    }
    else {
        return res.status(400).json({
            success : false,
            message : 'User registration failed, please try again'
        });
    }

    } catch(error) {
        console.log('An error occured while registering', error);
    }
};



const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const checkEmailExists = await user.findOne({email});
        if(!checkEmailExists){
            return res.status(400).json({
                success : false,
                message : 'User not registered'
            });
        }

        const passwordMatch = await bcrypt.compare(password, checkEmailExists.password);
        if(!passwordMatch){
            return res.status(400).json({
                success : false,
                message : 'Incorrect password'
            });
        }

        //Creating token
        const accessToken = jwt.sign({
            userId : checkEmailExists._id,
            emailid : checkEmailExists.email,
            role : checkEmailExists.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '60m'
        });

        res.status(200).json({
            success : true,
            message : 'User logged in successful',
            accessToken
        });

    } catch(error) {
        console.log('error occured while logging in', error);
    }
};

//Change Password

const changePassword = async(req, res) => {
    try {
        const userId = req.userInfo.userId;

        const {oldPassword, newPassword} = req.body;

        const User = await user.findById(userId);

        const isPasswordMatch = await bcrypt.compare(oldPassword, User.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'Old password is wrong'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        User.password = newHashedPassword;
        await User.save();

        res.status(200).json({
            success : true,
            message : 'Password changes successfully'
        });
    } 
    catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : 'Change Password failed'
        });
    }
};








module.exports = {loginUser, registerUser, changePassword};