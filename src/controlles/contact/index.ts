import { Request, Response } from "express";
import { createContactService, deleteContactService, listContactService, updateContactService } from "../../services/contact";

export const createContactController = async (req: Request, res: Response) => {

    const id = req.user.id

    const { name, email, phone_number } = req.body

    const newContact = await createContactService(id, { name, email, phone_number })

    return res.status(201).json(newContact)
    
}

export const listContactController = async (req: Request, res: Response) => {
    
    const users = await listContactService()
    
    return res.json(users)
}

export const deleteContactController = async (req: Request, res: Response) => {
 
    const id = req.params.id

    const userContact = await deleteContactService(id)

    return res.status(200).json({message: 'Contact Delete', userContact})

}

export const updateContactController = async (req: Request, res: Response) => {
    const { id } = req.params

    const {
      name,
      email,
      phone_number
    } = req.body;

    const ContactUpdated = await updateContactService(id, {name, email, phone_number});
    return res.status(201).json({
      message: "Contact updated",
      contact: ContactUpdated,
    });
  };