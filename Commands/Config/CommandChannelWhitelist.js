//import {DB} from '../../Database/index';
import {emoji, sleep} from '../../Modules/Gears'

module.exports = {
  options: {
    name:'whitelist',
    aliases: ["wl-channel"]
  },

  run: async (DB, LAPSUS, message, args) => {
    let cmention = message.mentions.channels;

   if(!cmention) return message.channel.send(`Você não especificou o canal!`);
   message.channel.send(`${emoji('EMcarregando')} Adicionando canal(is) à whitelist...`).then( async (msg) => {
          msg.react(`📜`).then(() => {
           DB.Server.findOne({where: {ID: message.guild.id}}).then(server => {
             if(server.CommandCHANNEL.includes(cmention)) return msg.edit(`${emoji('EMerro')} O canal <#${cmention}> já está na whitelist!`) && msg.clearReactions();
             cmention.map(canal => server.CommandCHANNEL.push(canal.id))
             server.update({
               CommandCHANNEL: server.CommandCHANNEL
             }).then(() => {
                 msg.edit(`${emoji('EMsucesso')} Canal(is) adicionados(s) com sucesso!`)
                 const filter = (reaction, user) => reaction.emoji.name === '📜' && user.id === message.author.id;
                 const collector = msg.createReactionCollector(filter, { time: 20000 });
                 collector.on('collect', r => {
                 msg.edit(`📜 ${message.author}**, confira a lista branca do servidor!**\n ${server.CommandCHANNEL.map(canais => `<#${canais}>`).join(`\n`)}`);
            })
         })
       })
     })
   })
  }
}
