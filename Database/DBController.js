import DB from './index';
import LAPSUS from '../LAPSUS';


// Criando usuarios
const newUser = (nuser) => {
  DB.User.findOne({where:{ID: nuser}}).then(u => {
    if(!u || u === null) {
      return DB.User.create({ID: nuser}).then(() => {
        console.log(`Usuário (${nuser}) adicionado à database`)
      }).catch(err => {
        console.log(`Erro ao tentar adicionar usuário ${nuser}. Erro:` + err)
      })
    } else {
      return;
    }
  });
};


const newServer = (nserver) => {
  DB.Server.findOne({where: {ID: nserver}}).then(s => {
    if(!s || s === null) {
      return DB.Server.create({ID: nserver}).then(() => {
        console.log(`Servidor (${nserver}) adicionado à database.`)
      }).catch(err => {
        console.log(`Erro ao tentar adicionar servidor ${nserver}. Erro:` + err)
      })
    } else {
      return;
    }
  })
};






module.exports = {
  newUser,
  newServer
};
