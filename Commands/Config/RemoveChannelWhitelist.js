import {emoji, sleep} from '../../Modules/Gears';
module.exports = {
  options: {
    name:'unwhitelist',
    aliases: ['remove-whitelist']
  },

  run: async (DB, LAPSUS, message, args) => {
    let cmention = message.mentions.channels;
    message.channel.send(`${emoji('EMcarregando')} Removendo canais da whitelist...`).then(async (msg) => {
           msg.react(`📜`).then(() => {
            DB.Server.findOne({where: {ID: message.guild.id}}).then(server => {
              let newArr = server.CommandCHANNEL
              let cmentionArr = cmention.map(c => c.id);
              newArr = newArr.filter(item => !cmentionArr.includes(item));
              console.log(newArr)
              server.update({
                CommandCHANNEL: newArr
          }).then(() => {
            msg.edit(`${emoji('EMsucesso')} Whitelist limpa com sucesso!`)
          })
        })
      })
    })
  }
}
