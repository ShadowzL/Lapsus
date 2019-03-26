import ModulesArray from '../../Modules/Lists/ModulesAndProtocolNames.js';
import {emoji, sleep} from '../../Modules/Gears';

module.exports = {
  options: {
    name:'disable',
    aliases: ['desativar']
  },

  run: async (DB, LAPSUS, message, args) => {

    if(!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send()

    if(!args[0]) return message.channel.send(`${emoji('EMerro')} Ops, ${message.author}! Você não especificou um módulo!`);
    let Guild = await DB.Server.findOne({where: {ID: message.guild.id}})
    // Find and return module in a array
    let Validator = ModulesArray.find(item => item === args[0]);
    if(!Validator) return message.channel.send(`${emoji('EMerr404')} Ops, ${message.author}! Módulo não encontrado.`);

    message.channel.send(`${emoji('EMcarregando')} Desativando módulo...`).then(msg => {
      sleep(2750).then(() => {
          switch(args[0]){
          case(ModulesArray[0]):
          if(Guild.ChannelWhitelist != true) return msg.edit(`${emoji('EMerro')} O módulo não está ativo!`);
          Guild.update({
            ChannelWhitelist: false
          })
          msg.edit(`${emoji('EMoff')} Módulo desativado com sucesso!`);
          break;
      }
    })
  })
 }
}
