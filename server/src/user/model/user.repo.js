import UserModel from "./user.schema.js";

export const addUserRepo = async(user) => {
    return await new UserModel(user).save();
}

export const findUserRepo = async(sub) => {
    return await UserModel.findOne({sub})
}

export const getUsersRepo = async() =>{
    return await UserModel.find();
}