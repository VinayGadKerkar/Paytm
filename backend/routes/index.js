const { Router } = require('express');
const router = Router();
const userRouter = require('./user');
const accRouter = require('./account')


router.use('/user', userRouter);
router.use('/account' , accRouter);


module.exports = router;