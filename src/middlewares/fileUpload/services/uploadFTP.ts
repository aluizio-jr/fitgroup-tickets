import {  connectFtp } from "../../../config/ftp";
// import { IFile } from "../dtos";

export async function uploadFtp(file: Express.Multer.File) {
  const client = connectFtp();

  client?.on("ready", () => {
    client.mkdir("./fodase", true, (error) => {
      console.log({ error })
    });
  });

  // console.log({ FTP_ANEXO_PATH })

  // Ftp.put(file.buffer, String(FTP_ANEXO_PATH), (error) => {
  //   if (error) console.log(error);
  // })

  // console.log({ ftp })

  // if (!ftp) return;

  // ftp.list(".", (error, res) => {
  //   console.log("Entrei callback")
  //   if (error) console.log({ error });
  //   console.log({ res })
  //   // if (data) console.log({ data })
  // });
}