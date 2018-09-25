var ssh = require('./ssh');
var parameter = require('./parameter');



function main()
{
    try
    {
        // json params:
        // IP, user, password, output file..
        var options =  new parameter()
        var command_list = options.get_commandSync('command.json');
        var authorization = options.get_authorizationSync('user.json');

        var connection = new ssh();
        


    }
    catch (error)
    {
        console.log(error);
    }
   
}

main();