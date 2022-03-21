import multer, { Options } from "multer"
import path from "path"
import crypto from "crypto"
import aws from "aws-sdk"
import multerS3 from "multer-s3"
import { IFile } from "../@types/file"

console.log(process.env.AWS_ACCESS_KEY_ID);

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp'))
        },
        filename: (req, file: IFile, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err, '');

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'fg-tickets',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err, '');

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        }
    })
}

export const multerConfig: Options = {
    dest: path.resolve(__dirname, '..', 'tmp'),
    storage: storageTypes['s3'],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            "application/pdf"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo invalido.'));
        }
    }
};

const multerInstance = multer(multerConfig);

export default multerInstance;