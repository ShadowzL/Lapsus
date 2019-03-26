const dice = require('rpg-dice');
import {emoji, sleep} from '../../Modules/Gears.js';
import {ReactionCollector} from 'discord.js';

module.exports = {
  options: {
    name:'dice',
    aliases: ['dados']
  },

  run: async (LAPSUS, DB, message, args) => {
    if(isNaN(args[0]) || isNaN(args[1])) return message.channel.send(`${message.author}, os parâmetros precisam ser apenas números!`);
    if(args[0] > 30) return message.channel.send(`${message.author} Não seja um maniaco por dados, cara. 30 vezes ja tá bom!`);
    if(args[1] > 1000000000) return message.channel.send(`${message.author} Não sei muito sobre dados, mas acho que não existem dados com tantos lados, amigo!`)

    let dado = await dice.roll(args[0], args[1]);

    message.channel.send(`${emoji('EMcarregando')} Rolando dado(s)...`).then(msg => {
      msg.edit(`O resultado é **${dado.result}**`).then(async (m) => {
       m.react(`ℹ`);

       const filter = (reaction, user) => reaction.emoji.name === 'ℹ' && user.id === message.author.id;
       const collector = m.createReactionCollector(filter, { time: 20000 });

       const fnc = setTimeout(() => {m.clearReactions()}, 20000);

       collector.on('collect', r => {
         var vez = `vez`;
         if(dado.rolls.length > 1) var vez = `vezes`;
         return m.edit(`Os dados rolaram **${args[0]}** ${vez}, e seus resultados foram ${dado.rolls.map(roll => `\`${roll}\``).join(`, `)}, totalizando **${dado.result}**`)
       })
     })
   })
  }
}
