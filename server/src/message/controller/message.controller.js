import mongoose from 'mongoose';
import grid from 'gridfs-stream';

import { addMessageRepo, getMessageRepo } from "../model/message.repo.js"

export const addMessage = async(req, res) =>{
    try{
        // console.log("add message Controller Called");
        // console.log(req.body);
        const newMessage = await addMessageRepo(req.body);
        console.log(newMessage);
        return res.status(200).json(newMessage);

    }catch(error){
        return res.status(500).json(error);
    }
}

export const getMessage = async(req, res)=>{
    try{
        // console.log("add message Controller Called");
        // console.log(req.params);
        const {id} = req.params;
        const messages = await getMessageRepo(id);
        
        return res.status(200).json(messages);
        
    }catch(error){
        return res.status(500).json(error);
    }

}

//upload File to mongoose db
const url = 'http://localhost:8000';

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const uploadFile = async(req, res) =>{
    console.log("inside upload file")
    if(!req.file) 
        return res.status(404).json("File not found");
        console.log("before creating imageUrl")
    const fileUrl = `${url}/message/file/${req.file.filename}`;

    res.status(200).json(fileUrl);
}

export const getFile = async (req, res) => {
    console.log("inside getfile")
    try {   
        const file = await gfs.files.findOne({ filename: req.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(res);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}