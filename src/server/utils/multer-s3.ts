import config from '../config';
import * as path from 'path';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3'; // needed to connect multer to aws
import * as aws from 'aws-sdk';

// connect to amazon
const s3 = new aws.S3({ // S3 = simple storage service
    accessKeyId: config.keys.aws_key_id,
    secretAccessKey: config.keys.aws_secret_key
})

// configure multers3 to use our bucket and store the data in our storage variable
const storage = multerS3({
    s3,
    bucket: 'personal-food-blog',
    acl: 'public-read', // access control list. public-read means eveyone can see it whether they are logged in or not
    metadata: function(req, file, cb) { // metadata is a callback that accepts the request and file, and returns a metadata object to be saved to S3
        cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
    }
})

// // configure multer to store data in our project
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) { // cb stands for callback
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
//   })

// creates an express multer middleware called upload to use the storage system defined by multer s3 that is connected to amazon
export const upload = multer({ storage });