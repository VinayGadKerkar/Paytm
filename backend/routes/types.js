const zod = require('zod');

const userSignUp = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()

})

const userSignin = zod.object({
    username: zod.string(),
    password: zod.string()
})

module.exports = {
    userSignUp,
    userSignin
}