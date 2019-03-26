import {emoji, sleep} from '../../Modules/Gears';
module.exports = {
  options: {
    name:'unwhitelist',
    aliases: ['remove-channel']
  },

  run: async (DB, LAPSUS, message, args) => {
    let cmention = message.mentions.channels;
    if(!cmention) return message.channel.send(`Você não especificou o canal!`);
    message.channel.send(`${emoji('EMcarregando')} Removendo canal da whitelist...`).then(async (msg) => {
           msg.react(`📜`).then(() => {
            DB.Server.findOne({where: {ID: message.guild.id}}).then(server => {
              //if(!server.CommandCHANNEL.includes(cmention)) return msg.edit(`${emoji('EMerro')} O canal ${cmention.map(f => `${f}`)} não está na whitelist!`);
              const newArr = server.CommandCHANNEL.filter(f => f != cmention.map(canal => canal.id));
              server.update({
                CommandCHANNEL: newArr
              }).then(() => {
                  msg.edit(`${emoji('EMsucesso')} Canal(is) removido(s) com sucesso!`)
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
