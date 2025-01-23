
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const verifyToken = async (req, res) => {
    const {token} = req.params;
    console.log("cgvjh", token);
    

    if(!token) {
        return res.status(401).json({
            success : false,
            message : "Unauthorized access"
        })
    }

    jwt.verify(token, 'ourSecretKey', async function(err, decoded) {
        if (err) {
            console.log(err);
            res.send("Email verification failed");
        }
        else {
            await User.findOneAndUpdate({token:token},{$set : {isVerified : true,token : null}},{new:true})
            res.send("Email verified successfully");
        }
    });

    

};



    

