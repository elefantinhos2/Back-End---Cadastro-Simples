import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { UserContact } from "../../entities/userContact.entity";
import { AppError } from "../../errors/AppError";
import { IContactRequest, IContactResponse, IContactResponseUpdate } from "../../interfaces/contact";

export const createContactService = async (id:string, { name, email, phone_number }: IContactRequest): Promise<IContactResponse> => {

    if(!name || !email || !phone_number) {
        throw new AppError("Illegal arguments", 400);   
    }

    const userRepository = AppDataSource.getRepository(User)

    const userContactRepository = AppDataSource.getRepository(UserContact)
    
    const user = await userRepository.findOneBy({ id: id });

    
    if (!user) {
        throw new AppError("User not found", 404);
    }

    /* */
    const contacts = await userContactRepository.find()

    const userContactsExisty = contacts.find(user => user.email === email)

    if (userContactsExisty) {
        throw new AppError('Contact already registered', 409)
    }
    /* */

    const userContact = new UserContact()
    userContact.name         = name
    userContact.email        = email
    userContact.phone_number = phone_number
    userContact.user = user 

    userContactRepository.create(userContact)
    await userContactRepository.save(userContact)

    const contactResponse:IContactResponse = {
        id: userContact.id,
        name: userContact.name,
        email: userContact.email,
        phone_number: userContact.phone_number,
        created_at:   userContact.created_at
    }

    return contactResponse;
}

export const listContactService = async () => {

    const userContactRepository = AppDataSource.getRepository(UserContact)

    const contacts = await userContactRepository.find()

    return contacts
}

export const deleteContactService = async (id: string) => {

    const userContactRepository = AppDataSource.getRepository(UserContact)

    const contact = await userContactRepository.findOneBy({id: id})

    if(!contact) {
        throw new AppError("User not found", 404)
    }

    await userContactRepository.delete({id: id});

    return contact

}

export const updateContactService = async (id: string,{ name, email, phone_number }: IContactRequest): Promise<IContactResponseUpdate> => {
    
    if (!id) {
        throw new AppError("id not found.", 404);
    }

    const userContactRepository = AppDataSource.getRepository(UserContact)
   
    const contacts = await userContactRepository.find()

    const contact = contacts.find(contact => contact.id === id) 
    
    if (!contact) {
      throw new AppError("Contact not found.", 404);
    }

    if (!name) {
      name = contact.name;
    }

    if (!email) {
        email = contact.email
      }
  
      if (!phone_number) {
          phone_number = contact.phone_number
      }
    
  
    const updatedContact = {
      id: contact.id,
      name: name,
      email: email,
      phone_number: phone_number,
      updated_at: new Date(),
    }
  
    await userContactRepository.update(contact.id, updatedContact);
  
    return updatedContact;
  }