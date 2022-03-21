import Client from "ftp";

export function connectFtp() { 
  try {
    const client = new Client();
    
    client.connect({
      host: "ftp.fitgroup.com.br",
      password: "M)%TPqg.@go3",
      user: "fitgroup",
      connTimeout: 5000,
      keepalive: 20000,
    });

    return client;
  } catch (error: any) {
    console.log({ error });
  } 
}



// import Ffp, { JsftpOpts } from "jsftp";
// import net from "net";

// const { FTP_HOST, FTP_USER_NAME, FTP_PASSWORD } = process.env;

// const config: JsftpOpts = {
//   host: 'ftp.fitgroup.com.br',
//   port: 22,
//   user: "fitgroup",
//   pass: "M)%TPqg.@go3",
//   createSocket: ({port, host}, firstAction) => {
//     return net.createConnection({port, host}, firstAction);
//   }, // function that creates the socket, default uses net.createConnection
// }

// export function connect(): Ffp | undefined {
//   try {
//     return new Ffp(config)
//   } catch (error: any) {
//     console.log({ error });
//   }
// }

// // export const Ftp = new Ffp(config);