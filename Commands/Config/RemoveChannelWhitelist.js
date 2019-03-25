import {emoji, sleep} from '../../Modules/Gears';
module.exports = {
  options: {
    name:'unblchannel',
    aliases: ['remove-channel']
  },

  run: async (DB, LAPSUS, message, args) => {
      let cmention = message.mentions.channels;
      let cArr = new Array();
      cmention.map(canal => cArr.push(canal.id));
      console.log(cArr)

  }
}
