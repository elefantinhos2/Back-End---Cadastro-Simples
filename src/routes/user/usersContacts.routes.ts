import { Router } from "express";
import { createContactController, deleteContactController, listContactController, updateContactController } from "../../controlles/contact";
import { AuthMiddleware } from "../../middlewares/verifyAuth.middleware";

const userContacts = Router()

userContacts.post('', AuthMiddleware, createContactController)

userContacts.get('', listContactController)

userContacts.delete('/:id', AuthMiddleware, deleteContactController)

userContacts.patch("/:id", AuthMiddleware, updateContactController)

export default userContacts