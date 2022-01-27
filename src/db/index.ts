export async function connect(){
    let globalWithConnection = global as typeof globalThis & {connection: any}
    if(globalWithConnection.connection && globalWithConnection.connection.state !== 'disconnected')
        return globalWithConnection.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://fitgroup_erp:dhvtnc0809vps@fitgroup.com.br:3306/fitgroup_erp");
    
    globalWithConnection.connection = connection;
    return connection;
}