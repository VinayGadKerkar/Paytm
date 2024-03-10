const express = require('express');
const zod = require('zod');
const { User, Account } = require('../db');
const { secret } = require('../config');
const { userSignin, userSignUp } = require('./types');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/middleware');
const userRouter = express.Router();

userRouter.post("/signup", async function (req, res) {
    const user = req.body;
    const isUser = userSignUp.safeParse(user);
    if (isUser.success) {
        User.findOne({
            username: user.username
        })
            .then((value) => {
                if (value) {
                   return  res.status(411).json({
                        message: "this user already exists"
                    })
                    
                }
            })



        const userCreated = await User.create({
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
        }
        )
        if (!userCreated) {
            return  res.status(411).json({
                message: "Invalid inputs/Error while creating a User"
            })
            
        }
        const userId = userCreated._id
        Account.create({
            userId,
            balance: Math.random() * 1000 + 1
        })

        const token = jwt.sign({
            userId
        }, secret);

        res.json({
            message: "User created successfully",
            token: token
        })
    }

})
userRouter.post("/signin", async function (req, res) {
    const user = req.body;
    const isUser = userSignin.safeParse(user);
    if (isUser.success) {

        const userDetails = await User.findOne({
            username: user.username,
            password: user.password
        })
        const userId = userDetails._id

        if (userDetails) {
            const token = jwt.sign({userId}, secret)
            res.status(200).json({
                token
            })
            return ;
        }
        else {
            return res.status(411).json({
                message: "Error while logging in"
            })
        }

    }
})
userRouter.put('/', authMiddleware, function (req, res) {
    const updateBody = zod.object({
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
    })
    const userDetails = req.body;
    const userDetailsC = updateBody.safeParse(userDetails);
    if (userDetailsC.success) {

        User.updateOne({
            _id: userDetails._id
        }, {

            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName

        })
            .then((value) => {
                if (value) {
                    res.status(200).json({
                        message: "Updated successfully"
                    })
                }
                else {
                   return res.status(411).json({
                        message: "Error while updating information"
                    })
                }
            })
    }
    else {
       return res.status(411).json({
            message: "invalid inputs"
        })
    }
})
userRouter.get('/bulk', authMiddleware, async function (req, res) {
    const filterItem = req.query.filter || "";
    const user = await User.find({
        $or: [
            {
                'firstName': {
                    '$regex': filterItem
                }
            },
            {
                'lastName': {
                    '$regex': filterItem
                }
            },

        ]
    })
    if (user) {
        res.status(200).json(user)
    }
    else {
        return res.status(411).json({
            message: "No results found!"
        })
    }
})

userRouter.get("/details" , authMiddleware , async (req , res) =>{
       const id = req.userId;
       const user = await User.findOne({
           _id:id 
       });
       if(!user){
        return res.status(411).json({
            message: "No results found!"
        })
       }
       res.status(200).json(user);
       
})
module.exports = userRouter;