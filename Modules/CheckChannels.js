import LAPSUS from '../LAPSUS';
import DB from '../Database/index';
import {emoji} from './Gears';

export default async (server, channel) => {
  const Guild = await DB.Server.findOne({where: {ID: server}});
  if(!Guild) return null;

  let ToF;

  if(Guild.CommandCHANNEL.includes(channel)){
    let ToF = true;
    return true;
  } else {
    let ToF = false;
  }

  return ToF;
};
