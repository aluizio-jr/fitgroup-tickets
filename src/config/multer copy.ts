import multer, { Options } from "multer"
import sftpStorage from "multer-sftp"
import path from "path"
import crypto from "crypto"

export const multerConfig: Options = {
    dest: path.resolve(__dirname, "..", "tmp", "uploads") ,
    storage: sftpStorage({
        sftp: {
            host: String(process.env.FTP_HOST),
            port: 22,
            username: String(process.env.FTP_USER_NAME),
            password: String(process.env.FTP_PASSWORD)
        },
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "tmp", "uploads"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err, '');

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => { 
        const allowedMimes = [
            'image/jpeg', 
            'image/png', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/pdf'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Arquivo invalido!'));
        }
    }
}
