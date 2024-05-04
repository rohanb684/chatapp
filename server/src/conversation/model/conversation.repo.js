import ConversationModel from "./conversation.schema.js"

export const addConversationRepo = async ({senderId, receiverId, message}) =>{

    if(senderId == receiverId){
        const newConversation =  new ConversationModel({
            members: [senderId],
            message
        })
        return await newConversation.save();
    }

    const newConversation =  new ConversationModel({
        members: [senderId, receiverId],
        message
    })

    return await newConversation.save();
}

export const updateMessageRepo = async({senderId, receiverId, message}) => {
    if(senderId == receiverId){
        return await ConversationModel.updateOne(
            { members: {$all: [senderId], $size: 1} },
            { $set: { message: message } },
            { new: true }
        );
    }
    return await ConversationModel.updateOne(
        { members: {$all: [senderId, receiverId]} },
        { $set: { message: message } },
        { new: true }
    );
}

export const getConversationRepo = async ({senderId, receiverId}) => {
    if(senderId == receiverId){
        return await ConversationModel.findOne({$and: [
            { members: senderId }, // Ensure senderId is present in the members array
            { $where: "this.members.length === 1" } // Ensure there is exactly one member in the members array
        ]})
    }
    return await ConversationModel.findOne({members: {$all: [senderId, receiverId]}})
}