const {Router}=require("express")
const{login,logout,signup}=require("../controller/usercontroller")
const {authentication}=require("../middleware/auth")
const userRouter=Router()
userRouter.post("/signup",signup)
userRouter.post("/login",login)

userRouter.get("/logout",authentication,logout)
module.exports={userRouter}