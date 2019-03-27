import {emoji, sleep} from '../../Modules/Gears';
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

        const filter = (reaction, user) => reaction.emoji.id === emoji('EMinvite').id && user.id === message.author.id;
        const collector = msg.createReactionCollector(filter, {time: 10000});

        collector.on('collect', r => {
          embed.setTitle(`Atenção! :warning:`)
          embed.setDescription(`Eba! Parece que é a sua primeira mensagem de bem-vindo sendo definida no meu sistema! Antes de definir sua mensagem, leve em consideração algumas dicas especiais! Utilize a sua mensagem de boas-vindas:

- \`{user}\` = Menciona o novo membro;
- \`{guild}\` = Adiciona o nome do servidor na mensagem;
- \`{users}\` = Adiciona o número de membros do servidor na mensagem.

OBS: A mensagem deve ter no máximo **1999 caracteres**.`)
          msg.edit(embed).then(() => {
            msg.clearReactions().then(() => {
              msg.react(emoji('EMconfirma').id).then(() => {
                msg.react(emoji('EMcancel').id)

                const multifilter = (r, u) => (r.emoji.id === emoji('EMconfirma').id || r.emoji.id === emoji('EMcancel').id) && u.id === message.author.id
                const collect = msg.createReactionCollector(multifilter, {time: 15000})

                collect.on('collect', react => {
                    switch(react.emoji.id){
                      case(emoji('EMconfirma').id):
                      msg.delete()
                      message.channel.send(`${emoji('EMsucesso')} Ótimo, agora escreva sua mensagem! Você tem **30** segundos.`).then(async (m) => {
                        const MsgFilter = m => m.author.id === message.author.id;
                        const MsgCollector = m.channel.createMessageCollector(MsgFilter, { time: 30000 });


                        MsgCollector.on('collect', welcomeText => {
                            m.edit(`${emoji('EMcarregando')} ${message.author} Mensagem coletada! Processando...`).then(() => {
                              sleep(2500).then(() => {
                                DB.Server.findOne({where: {ID: message.guild.id}}).then(guildDB => {
                                  guildDB.update({
                                    WelcomeMSG: welcomeText.content
                                }).then(() => {
                                  if(guildDB.Welcome === true) return m.edit(`${emoji('EMsucesso')} Pronto! Está tudo definido hehehe`);
                                  m.edit(`${emoji('EMsucesso')} Pronto! Sua mensagem está definida. Deseja ativa-la agora?`).then(m2 => {
                                    m2.react(emoji('EMconfirma').id).then(() => {
                                      m2.react(emoji('EMcancel').id)

                                      const multifilter2 = (r, u) => (r.emoji.id === emoji('EMconfirma').id || r.emoji.id === emoji('EMcancel').id) && u.id === message.author.id
                                      const collect2 = m2.createReactionCollector(multifilter2, {time: 15000})

                                      collect2.on('collect', active => {
                                        switch(active.id){
                                          case(emoji('EMconfirma').id):
                                          guildDB.update({
                                            Welcome: true
                                          }).then(() => {
                                            m2.edit(`Bom, agora falta apenas definir o canal onde sua mensagem irá ser enviada. Para fazer isso, basta menciona-lo! (Você tem 10 segundos)`).then(() => {
                                              
                                            })
                                          })
                                        }
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                      break;
                    }
                })
              })
            })
          })
        })
      })
    })
  }
}
