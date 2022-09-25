import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserCreateResponse, IUserCreateRequest, IUserRequestUpdate, IUserResponseUpdate } from "../../interfaces/user";


export const createUserService = async ({ name, email, phone_number }: IUserCreateRequest): Promise<IUserCreateResponse> => {

    const userRepository = AppDataSource.getRepository(User)

    if(!name || !email || !phone_number) {
        throw new AppError("Illegal arguments", 400);   
    }

    
    const users = await userRepository.find()

    const emailAlreadyExisty = users.find(user => user.email ===email) 

    
    if( emailAlreadyExisty ) {
        throw new AppError("Email already existy", 409)
    }


    const user = new User()
    user.name = name
    user.email = email
    user.phone_number = phone_number

    //adionando ao DB
    userRepository.create(user)
    await userRepository.save(user)

    const userResponse:IUserCreateResponse = {
        id: user.id,
        name,
        email,
        phone_number,
        created_at: user.created_at,
    }

    return userResponse;

}

export const listUserService = async (): Promise<User[]> => {
    
    const userRepository = AppDataSource.getRepository(User)

    const users = userRepository.query('select * from users');

    return users

}

export const retriveUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);
  
    const user = await userRepository.findOne({ 
      relations: {
        contacts: true
      }, 
      where: {
        id: id
      } 
    });
  
    if (!user) {
      throw new AppError("User not found", 404);
    }
  
    return user;
}

export const updateUserService = async (id: string,{ name, email, phone_number }: IUserRequestUpdate): Promise<IUserResponseUpdate> => {
    
    const userRepository = AppDataSource.getRepository(User)
    
    const user = await userRepository.findOne({ where: { id } })
  
    if (!user) {
      throw new AppError("User not found.", 404)
    }
  
    if (!name) {
      name = user.name
    }
  
    if (!email) {
      email = user.email
    }

    if (!phone_number) {
        phone_number = user.phone_number
    }
  
    const updatedUser = {
      id: user.id,
      name: name,
      email: email,
      phone_number: phone_number,
      updated_at: new Date(),
    };
  
    await userRepository.update(user!.id, updatedUser)
  
    return updatedUser
}

export const deleteUserService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({ where: { id } })

    if(!user){
        throw new AppError("User not found", 404)
    }

    await userRepository.delete({id: id})

    return user

}
