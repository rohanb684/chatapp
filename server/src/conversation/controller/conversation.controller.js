import { getConversationRepo, addConversationRepo, updateMessageRepo } from "../model/conversation.repo.js";

export const addConversation = async (req, res) =>{
    const {senderId, receiverId, message} = req.body;
    try{
        const exist = await getConversationRepo({senderId, receiverId});
        if(exist){
            // console.log("add convo controller: " + senderId + " " + receiverId);
            // console.log("exist: ");
            // console.log(exist);
            if(message){
                const updateMessage = await updateMessageRepo({senderId, receiverId, message})
                return res.status(200).json({msg:"Last message updated", convo:updateMessage});
            }
            return res.status(200).json({msg:"Conversation already exist", convo:exist});
        }

        const newConversation = await addConversationRepo({senderId, receiverId, message})
        // console.log("add convo controller: " + senderId + " " + receiverId);
        // console.log("newConversation: ");
        // console.log(newConversation);

        res.status(200).json({ msg:"New Conversation created",convo:newConversation});

    }catch(error){
        return res.status(500).json(error);
    }
}

export const getConversation = async(req, res) =>{
    const {senderId, receiverId} = req.body;
    // console.log("get convo controller" + senderId + " " + receiverId);

    try{
        const conversation = await getConversationRepo({senderId, receiverId});
        // console.log("Fetched Conversation");
        // console.log(conversation)
        return res.status(200).json(conversation);

    }catch(error){
        return res.status(500).json(error);
    }
}