var ssh_client =require( 'ssh2').Client;
var fs = require('fs');


module.exports = class SSH
{
    constructor(host=null, port=22, user=null, password=null, path_output){
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.output = path_output;
        this.connection = new ssh_client();
        this.streamWriter = fs.createWriteStream(this.output);
    }

    send_command(command_list){
        // send command when the connection to host is confirmed.
        var conn = this.connection;

        conn.on('ready', () => {
            console.log('Connection ok.');
            var writer = this.streamWriter;

            // if conn is 'ready' then execute the command parameter  
            conn.shell( (error, stream) => {
                if (error) throw error;

                stream
                // when the stream is closed..
                .on('close', (code, signal) => {
                    console.log(`Stream close: ${code}; Signal: ${signal}`);
                    conn.end();
                })

                // when the output from the host is received..
                .on('data', (data) => {
                    writer.write(data);
                    console.log(`output from ${this.host}: ${data}`);
                })
                .stderr.on('data', (data) => console.log(`stderr: ${data}`));

                command_list.forEach( command => { stream.end(command); });   
            });
            

        }).connect({
            host: this.host,
            port: this.port,
            username: this.user,
            password: this.password
        });
    }
}