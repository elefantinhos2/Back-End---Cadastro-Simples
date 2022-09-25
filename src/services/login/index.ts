import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/login";

export const userLoginService = async ({email}: IUserLogin) => {

    const userRepository = AppDataSource.getRepository(User) 


    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if (!user) {
        throw new AppError("Account not found", 404)
    }
 

    const token = jwt.sign({
        id: user.id,
        name: user.name
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: "1h"
    }
)

return token

}