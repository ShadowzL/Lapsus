import {newUser, newServer} from '../../Database/DBController';
import {emoji} from '../../Modules/Gears';
import CheckChannel from '../../Modules/CheckChannels';
import DB from '../../Database/index';

module.exports = {
    name: 'message',

    run: async (LAPSUS, message) => {

        await newUser(message.author.id);
        await newServer(message.guild.id);

        let prefix = process.env.PREFIX;
        let msgArr = message.content.split(' ');
        let cmd = msgArr[0];
        let args = msgArr.slice(1);

        if(!message.content.startsWith(prefix)) return;

        let cmdf = LAPSUS.commands.get(cmd.slice(prefix.length)) || LAPSUS.commands.get(LAPSUS.aliases.get(cmd.slice(prefix.length)));

        let Guild = await DB.Server.findOne({where: {ID: message.guild.id}});

        if(cmdf && Guild.ChannelWhitelist === true){
          if(message.member.hasPermission(`ADMINISTRATOR`)) return cmdf.run(DB, LAPSUS, message, args)
          if(Guild.CommandCHANNEL.includes(message.channel.id)) return cmdf.run(DB, LAPSUS, message, args);
          else return message.channel.send(`${emoji('EMerro')} ${message.author} Não posso responder comandos neste canal!`)
        } else if(cmdf && Guild.ChannelWhitelist != true){
          return cmdf.run(DB, LAPSUS, message, args);
        }
    }
};
