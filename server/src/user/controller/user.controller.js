import { addUserRepo, findUserRepo, getUsersRepo } from "../model/user.repo.js"

export const addUser = async(req, res) =>{
    try{
        console.log("user controller");

        // console.log(req.body);
        const exist = await findUserRepo(req.body.sub);
        if(exist){
            return res.status(200).json({msg:'user already exist'});
        }
        const newUser  = await addUserRepo(req.body);
        // console.log("newUser");
        // console.log(newUser);
        return res.status(200).json(newUser);
    }catch(error){
        return res.status(500).json(error.message);
    }
}

export const getUsers = async(req, res) =>{
    try{
        const users=  await getUsersRepo();
        return res.status(200).json(users);

    }catch(error){
        return res.status(500).json(error.message);
    }
}