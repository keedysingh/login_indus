const utils = require('../utils/getData.utils');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const Joi = require('joi');
const logger=require('../config/logger.config');

class AuthController {

    login = (req, res) => {
        // Schema for username and password
        const schema = Joi.object().keys({
            userName: Joi.string().min(3).max(30).required(),
            password: Joi.string().min(3).max(30).required()
        });
        try{
            const { body } = req;
            
            logger.info(`Login attempt by ${body.userName}`)
            const result = schema.validate(body) // validate request with the pre defined schema
            const {
                value,
                error
            } = result;
            const valid = error == null;
            // Throw error if request is invalid
            if (!valid) {
                logger.error(error.details)
                res.status(422).json({
                    message: 'Invalid request',
                    data: body
                })
                return false;
            } else {
            const existAccounts = utils.getUserData() // Get all user from file
            let user=existAccounts.filter(data=>{
                return data.username==body.userName
            })
            // Check if existing user exist or not
            if (user.length==0) {
                return res.status(403).send({
                    message: "User Not found."
                });
            }
            const passwordIsValid = bcrypt.compareSync(
                body.password,
                user[0].password
            );
// check if password is valid or not
            if (!passwordIsValid) {
                return res.status(403).send({
                    message: "Invalid Password!",
                });
            }
            // Create JWT token
            const token = jwt.sign({
                    id: user[0].userId
                },
                config.secret, {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });
            // Send token to client
            return res.status(200).send({
                token
            });
        }
        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }


    }
    profile = (req, res) => {
        //  res.writeHead(200, {'Content-Type': 'text/html'});
        // res.status(200).send("hii")
        // return
        
        try{
            logger.info(`Profile accessed by userID : ${req.userId}}`)
            if(req.userId){
            const existAccounts = utils.getUserData() // Fetch all user data from file
            // Check is user exist or not 
            let user=existAccounts.filter(data=>{
                return data.userId==req.userId
            })
            
            /* 
            If user not exist in file throw error
            else return user details
            */

            if (user.length==0) {
               
                return res.status(403).send({
                    message: "User Not found."
                });
            }else{
                return res.status(200).send({
                    userId:user[0].userId,
                    username:user[0].username,
                    email:user[0].email,
                    profilePic:user[0].profilePic
                }); 
            }
            }
        }catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
      
      
    }
    test = (req, res) => {
        res.status(200)
    }


}

module.exports.auth = new AuthController();