var fileSystem  = require('fs');
var logger = require('./log');

module.exports = class Parameter
{
    constructor(){
        this.command_list = [];
        this.isEmptyList = false;
        this.log = new logger();
    }

    _readJson(file_to_read){
        try
        {
            var json_file = fileSystem.readFileSync(file_to_read);
            var json_obj = JSON.parse(json_file);
            this.log.info(`${file_to_read} opened; import data correctly!`);

            return json_obj;
        }
        catch(error)
        {
            this.log.err(`${file_to_read} Not found/Can t open, error: ${error}`);
        }
    }

    _readAuthFile(auth_file){
        var auth_params = this._readJson(auth_file);
        
        if(auth_params.length == 0)
        {
            throw this.log.warn(auth_params + ': is Empty..');
            return;
        }
        return auth_params;
    }
    
    _readCommandFile(command_file){
        // import command from json file
        var cmd_list = this._readJson(command_file);
        this.command_list = cmd_list.command;

        if(this.command_list.length == 0){
            throw this.log.warn(command_file + ': is Empty..');
            this.isEmptyList = true;
            return;
        }

        this.log.debug(`${command_file}: Found! Has ${this.command_list.length} elements.`);
        return;

    }

    get_commandSync(command_file){
        this.log.info('Request for command file: ' + command_file);

        this._readCommandFile(command_file);
        
        if (! this.isEmptyList)
            return this.command_list;
    }

    get_authorizationSync(auth_file){
        this.log.info('Request for command file: ' + auth_file);

        return this._readAuthFile(auth_file);
    }
}

