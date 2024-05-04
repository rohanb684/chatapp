import MessageModel from "./message.schema.js";

export const addMessageRepo = async(data) =>{
    const newMessage = new MessageModel(data);
    return await newMessage.save();
}

export const getMessageRepo = async(id) =>{
    return await MessageModel.find({ conversationId: id});
}