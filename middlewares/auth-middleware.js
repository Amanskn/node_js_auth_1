import jwt  from "jsonwebtoken";
import UserModel from "../models/User.js";


var checkUserAuth = async(req,res,next)=>{
    let token;
    const { authorization } = req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1];
            // verify Token
            const {userID} = jwt.verify(token,process.env.JWT_SECRET_KEY);

            // Get user from Token
            req.user = await UserModel.findById(userID).select("-password");

            next();
            
        } catch (error) {
            
            return res.status(200).json({
                message:'Unauthorized user'
            })
        }
    }else{
        return res.status(200).json({
            message:'No token'
        })
    }

}


export default checkUserAuth