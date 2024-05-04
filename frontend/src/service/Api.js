import axios from 'axios';


const url = 'http://localhost:8000';

export const addNewUser = async(user) =>{
    try{
        let response = await axios.post(`${url}/add`, user);
        // console.log(response);
        return response.data;

    }catch(error){
        console.log("Error while adding user", error);
    }
}

export const getUsers = async() =>{
    try{
        let response = await axios.get(`${url}/users`);
        // console.log(response);
        return response.data;

    }catch(error){
        console.log("Error while fetching users", error);
    }
}

export const setConversations = async(data) =>{
    try{
        // console.log("setConversation: ")
        // console.log(data);
        let response = await axios.post(`${url}/conversation/add`, data)
        // console.log(response.data)
        return response.data;
    }catch(error){
        console.log("Error setting conversations ", error);
    }
}

export const getConversation = async(data) =>{
    try{
        // console.log("getConversation Api Called");
        // console.log(data);
        
        let response = await axios.post(`${url}/conversation`, data)
        
        // console.log(response.data);
        return response.data;
    }catch(error){
        console.log("Error getting conversations ", error);
    }
}

export const addMessage = async(data) =>{
    try{
        let response = await axios.post(`${url}/message/add`, data)
        return response.data;
    }catch(error){
        console.log("Error adding message ", error);
    }
}

export const getMessage = async(data) =>{
    try{
        // console.log("getMessage")
        // console.log(data)
        let response = await axios.get(`${url}/message/${data.conversationId}`, data)
        return response.data;
    }catch(error){
        console.log("Error getting message ", error);
    }
}


export const uploadFile = async(data) =>{
    try{
        console.log("uploadFile API called");
        return await axios.post(`${url}/message/upload`, data)
    }catch(error){
        console.log("Error uploading file ", error);
    }
}

export const getFile = async(data) =>{
    try{
        return await axios.get(`${url}/message/file/data`)
    }catch(error){
        console.log("Error getting file ", error);
    }
}