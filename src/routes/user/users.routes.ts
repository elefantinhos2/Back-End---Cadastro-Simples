import { Router } from "express";
import { createUserController, deleteUserController, listNewUserController, retriveUserController, updateUserController } from "../../controlles/user";
import { AuthMiddleware } from "../../middlewares/verifyAuth.middleware";

const user = Router()

user.post("/register", createUserController)

user.get("", listNewUserController)

user.get("/contacts", AuthMiddleware, retriveUserController)

user.patch("", AuthMiddleware, updateUserController)

user.delete("", AuthMiddleware, deleteUserController)

export default user