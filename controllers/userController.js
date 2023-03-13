import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController{
    static userRegistration = async (req, res) => {
        try{
            const { name, email, password, password_confirmation, tc } = req.body;
            const user = await UserModel.findOne({ email: email });
            if(user){
                return res.status(200).json({
                    status: "failed",
                    message: "Email already exists",
                });
            } 
            else{
                if(name && email && password && password_confirmation && tc){
                    if(password === password_confirmation) {
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            tc: tc,
                        });
                        await doc.save();
                        const saved_user = await UserModel.findOne({email:email});

                        // Generate JWT Token
                        const token = jwt.sign({userID:saved_user._id},
                            process.env.JWT_SECRET_KEY,{expiresIn : '5d'});
                        return res.status(200).json({
                            status: "succesful",
                            message: "User created successfully",
                            token:token
                        });

                    }
                    else{
                        return res.status(400).json({
                            status: "failed",
                            message: "Password and confirm password do not match",
                        });
                    }
                }
                else{
                    return res.status(200).json({
                        status: "failed",
                        message: "All fields are required",
                    });
                }
            }
        } 
        catch(err){
            return res.status(200).json({
                status: "failed",
                message: "inside catch",
                error: err,
            });
        }
    };



    static userLogin = async (req,res)=>{
        try {
            const {email, password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({ email: email });
                if(user){
                    const isMatch = await bcrypt.compare(password , user.password);
                    if(isMatch){
                        

                         // Generate JWT Token
                         const token = jwt.sign({userID : user._id},
                            process.env.JWT_SECRET_KEY,{expiresIn : '5d'});
                        return res.status(200).json({
                            message:'Logged in successfully',
                            token:token
                        });

                    }else{
                        return res.status(200).json({
                            message:'Invalid Email/Password'
                        });
                    }


                }else{
                    return res.status(200).json({
                        message:'you are not a registered user'
                    })
                }

                

            }else{
                return res.status(200).json({
                    status: "failed",
                    message: "All fields are required",
                });

            }

        } catch (error) {
            // console.log(error);
            return res.status(200).json({
                message:'Internal server error inside catch',
                Error:error
            })
            
        }
    }
}

export default UserController;