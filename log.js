var file = require('fs');

module.exports = class Log
{
    constructor()
    {
        this.log_file = 'log.txt';
    }
    
    _date(){
        var date = new Date(Date.now()).toLocaleString('it-IT');
        return date;
    }


    _write(level, msg){
        try
        {  
            var message = `\n${this._date()} | ${level} | ${msg}`;
            console.log(message);
    
            file.appendFileSync(this.log_file, message, 'utf8', (err) => {
                if(err){
                    console.log(this._date(), ' error during write log messages');
                    throw err;
                } 
            });
        }
        catch (error)
        {
            console.log(error);
        }

    }

    debug(msg){
        this._write('DEBUG', msg);
    }
    info(msg){ 
        this._write('INFO', msg);
    }
    warn(msg){
        this._write('WARN', msg);
    }
    err(msg){
        this._write('ERR', msg);
    }

}