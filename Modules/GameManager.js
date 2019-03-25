import {randomize} from "./Gears"
export default (game = false) => {
      try {
        if(game != false) return game;
        delete require.cache[require.resolve(`./Lists/Playing.js`)];
        var statusses = require('./Lists/Playing.js');
        var random = randomize(0, statusses.status.length-1);
        return statusses.status[random];
      } catch (e) {
      console.log('Erro ao tentar mudar status.' + e)
  }
}
