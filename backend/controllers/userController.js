import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}



// rooute for user login
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, messsage: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, messsage: "invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, messsage: error.messsage })
    }

}


// route for user register
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, messsage: "User already exists" })
        }

        // validatiing email format 7 strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, messsage: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, messsage: "Please enter a strong password" })
        }

        // hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })



    } catch (error) {
        console.log(error);
        res.json({ success: false, messsage: error.messsage })
    }
}

// route for admin login
const adminLogin = async (req, res) => {

    try {

    const {email, password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,token})
    }
    else{
        res.json({success:false,messsage:"Invalid credentials"})
    }

    } catch (error) {
        console.log(error);
        res.json({ success: false, messsage: error.messsage })
    }


}


// =========================================
// GET USER PROFILE
// =========================================

const getProfile = async (req, res) => {

    try {

        const user = await userModel
            .findById(req.userId)
            .select("-password")

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        res.json({
            success: true,
            user
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}



// =========================================
// UPDATE USER PROFILE
// =========================================

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            email,
            currentPassword,
            newPassword
        } = req.body


        // =========================================
        // FIND USER
        // =========================================

        const user = await userModel.findById(req.userId)

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            })

        }


        // =========================================
        // UPDATE NAME
        // =========================================

        if (name && name.trim() !== "") {

            user.name = name.trim()

        }


        // =========================================
        // UPDATE EMAIL
        // =========================================

        if (email && email.trim() !== "") {

            const newEmail = email.trim().toLowerCase()

            if (!validator.isEmail(newEmail)) {

                return res.json({
                    success: false,
                    message: "Please enter a valid email"
                })

            }


            // Check if another account
            // already uses this email

            const emailExists = await userModel.findOne({
                email: newEmail,
                _id: { $ne: req.userId }
            })

            if (emailExists) {

                return res.json({
                    success: false,
                    message: "Email is already in use"
                })

            }

            user.email = newEmail
        }


        // =========================================
        // CHANGE PASSWORD
        // =========================================

        if (newPassword && newPassword.trim() !== "") {

            if (!currentPassword) {

                return res.json({
                    success: false,
                    message: "Current password is required"
                })

            }


            // Check current password

            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            )

            if (!isMatch) {

                return res.json({
                    success: false,
                    message: "Current password is incorrect"
                })

            }


            // Check new password length

            if (newPassword.length < 8) {

                return res.json({
                    success: false,
                    message: "New password must be at least 8 characters"
                })

            }


            // Hash new password

            const salt = await bcrypt.genSalt(10)

            const hashedPassword =
                await bcrypt.hash(newPassword, salt)

            user.password = hashedPassword
        }


        // =========================================
        // SAVE
        // =========================================

        await user.save()


        res.json({
            success: true,
            message: "Profile updated successfully"
        })


    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}




export { loginUser, registerUser, adminLogin, getProfile, updateProfile }