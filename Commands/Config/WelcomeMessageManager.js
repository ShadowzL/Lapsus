import {emoji} from '../../Modules/Gears';
import Discord from 'discord.js';

module.exports = {
  options: {
    name:'welcome',
    aliases: ['bem-vindo', 'bemvindo']
  },

  run: async (DB, LAPSUS, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${emoji('EMerro')} Você não tem permissão para usar este comando!`);
    let NewWelcome = message.content.split(' ').slice(1).join(' ');

    let embed = new Discord.RichEmbed()
      .setTitle(`Módulo de boas-vindas`)
      .setDescription(`Este é o meu módulo de boas-vindas! A partir deste menu, é possível revisar e configurar o meu módulo de recepção de membros.

Para configurar, reaja ao emoji ${emoji('EMinvite')} e siga as instruções. E para ver as configurações atuais, reaja ao emoji ${emoji('EMbook')}.`)
      .setColor('RED')

    message.channel.send(embed).then(async (msg) => {
      await msg.react(emoji('EMinvite').id).then(() => {
        msg.react(emoji('EMbook').id)
      })
    })
  }
}
