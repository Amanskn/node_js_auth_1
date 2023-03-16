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




    static changeUserPassword = async (req,res)=>{
        const {password, password_confirmation} = req.body;
        if(password && password_confirmation){
            if(password === password_confirmation){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // below three methodology are achieving the same goal at the end but I want to know the difference between them

                // 1st one
                // let user = await UserModel.findById(req.user._id);
                // user.password=hashedPassword;
                // user.save();


                // 2nd one
                // await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: hashedPassword }});


                // 3rd one
                await UserModel.findByIdAndUpdate(req.user._id, { password: hashedPassword });

                return res.status(200).json({
                    message:'Password changed successfully'
                })


            }else{
                return res.status(200).json({
                    message:'password and confirm password do not match'
                })
            }



        }else{
            return res.status(200).json({
                message:'All fields are required'
            })
        }
    }



    static loggedUser = async (req,res)=>{


        // my code 
        // if(req.user){

        //     let user = await UserModel.findById(req.user._id).select('-password');;
        //     return res.status(200).json({
        //         message:user
        //     })
        // }
        // else{
        //     return res.status(200).json({
        //         message:'Not an authenticated user'
        //     })
        // }


        // efficient code 
        return res.status(200).json({
            message:'user_info_is',
            user:req.user
        })
    }


}

export default UserController;