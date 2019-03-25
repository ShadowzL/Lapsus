import GameManager from "../../Modules/GameManager";
import {sleep} from '../../Modules/Gears';
module.exports = {
    name: 'ready',

    run: async (LAPSUS) => {
      LAPSUS.user.setActivity("Iniciando...");
      sleep(3000);
      console.log(`\n\n|-- LAPSUS SERVER STARTED --|`);
      const changeStatus = setInterval(() => LAPSUS.user.setActivity(GameManager(), {type: 'playing'}), 4500);
    }
};
