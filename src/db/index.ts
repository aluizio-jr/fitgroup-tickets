export async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://fitgroup_erp:dhvtnc0809vps@fitgroup.com.br:3306/fitgroup_erp");
    
    global.connection = connection;
    return connection;
}