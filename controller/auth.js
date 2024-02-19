const User = require("../model/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const passport = require("passport");
const jwt = require("jsonwebtoken")

const SignUp = async (req, res) => {
    const {username, email, password, country, city, phone_Number} = req.body;
    try {
        if(!username){
            return res.json("Username is required")
        }
        if(!email){
            return res.json("Email is required")
        }
        if(!password){
            return res.json("Password is required")
        }
        if(!phone_Number){
            return res.json("Phone Number is required")
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(401).json({message: "User Already Exist"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            country: country,
            city: city,
            phone_Number: phone_Number
        })
        User.register(newUser,password, function(error){
            if(err){
                console.log(err);
            }
            passport.authenticate("local")(req, res, function(err){
            res.status(200).json({message: "You have successfully SignedUp"})
            })
        })
        const transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.my_email,
                pass: process.env.my_password
            },
        });
        const mailOptions = {
            from: process.env.my_email,
            to: email,
            subject: 'Welcome to Our App',
            text: 'Hello! Welcome to our app. We hope you enjoy your experience'
        };
        transport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error)
            }
        })
    } catch (error) {
        console.log(err)
        res.status(500).json({error: error.message})
    }
};

const Login = async (req, res) => {
    const {username, password} = req.body;
    try {
       const existingUser = await User.findOne({username})
       if(!existingUser){
        return res.json({message: "User not found"})
       }
       const passwordMatch = await bcrypt.compare(password, existingUser.password)
       if(!passwordMatch){
        return res.json({message: "Invalid password"})
       }
       
       req.log(existingUser, function(error){
        if(err){
            res.json(error)
        }
        passport.authenticate("local")(req, res, function(err, user, info){
            if(err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h'});
            return res.json({ user: { email: user.email, username: user.username}, token});
        })(req, res);
    })
    } catch (error) {
        console.log(err)
        res,status(500).json({error: error.message})
    }
};