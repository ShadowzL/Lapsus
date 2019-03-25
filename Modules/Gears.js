import LAPSUS from '../LAPSUS';
import DB from '../Database/index';


const emoji = (emojiName) => LAPSUS.emojis.find(e => e.name === emojiName);

const randomize = (min, max) => Math.floor(Math.random() * (max - min) + min);

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

module.exports = {
  randomize,
  emoji,
  sleep
}
