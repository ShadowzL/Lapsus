export default (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    ID: {type: DataTypes.BIGINT, primaryKey: true},
    Welcome: {type: DataTypes.BOOLEAN, defaultValue: false},
    WelcomeMSG: {type: DataTypes.STRING, defaultValue: null},
    ChannelWhitelist: {type: DataTypes.BOOLEAN, defaultValue: null},
    CommandCHANNEL: {type: DataTypes.ARRAY(DataTypes.BIGINT), defaultValue: []},
    Gold: {type: DataTypes.DECIMAL, defaultValue: 0},
    Silver: {type: DataTypes.DECIMAL, defaultValue: 0},
    Bronze: {type: DataTypes.DECIMAL, defaultValue: 0},
    Donator: {type: DataTypes.BOOLEAN, defaultValue: false},
    Blacklisted: {type: DataTypes.BOOLEAN, defaultValue: false}
  });
  return Server;
}
