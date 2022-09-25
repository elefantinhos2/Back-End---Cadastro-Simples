import { Router } from "express";
import { userLoginController } from "../../controlles/login";


const loginRoutes = Router()

loginRoutes.post('', userLoginController)

export default loginRoutes