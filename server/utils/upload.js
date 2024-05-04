import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage';

const url = 'mongodb://localhost:27017/messangerclone';

const storage = new GridFsStorage({
     url,
    options:{useNewUrlParser:true,
            useUnifiedTopology:true},
    file: (req, file)=>{
        const match = ['image/png', 'image/jpg'];
        // console.log("inside Storage")
        if(match.indexOf(file.memeType) === -1) {
            // console.log("inside Storage if")
            return`${Date.now()}-blog-${file.originalname}`;
        }else{
            console.log("inside Storage else")
            return {
                bucketName: "photos",
                filename: `${Date.now()}-blog-${file.originalname}`
            }
        }
            

        

    } });

const upload = multer({ storage });

export default upload;