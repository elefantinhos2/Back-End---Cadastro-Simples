import { Request, Response } from "express"
import { createUserService, deleteUserService, listUserService, retriveUserService, updateUserService } from "../../services/user"

export const createUserController = async (req: Request, res: Response) => {
    
    const { name, email, phone_number } = req.body

    const newUser = await createUserService({name, email, phone_number})

    return res.status(201).json(newUser)

}

export const listNewUserController = async (req: Request, res: Response) => {
    
    const users = await listUserService()
    
    return res.json(users)

}

export const retriveUserController = async (req: Request, res: Response) => {

    const id = req.user.id
  
    const user = await retriveUserService(id)
  
    return res.status(200).json(user)

}

export const updateUserController = async (req: Request, res: Response) => {
    const id = req.user.id

    const {
      name,
      email,
      phone_number
    } = req.body;

    const UserUpdated = await updateUserService(id, {name, email, phone_number});
    return res.status(201).json({
      message: "User updated",
      user: UserUpdated,
    });
}

export const deleteUserController = async (req: Request, res: Response) => {
 
    const id = req.user.id

    const userContact = await deleteUserService(id)

    return res.status(200).json({message: 'User Delete', userContact})

}