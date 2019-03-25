export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    ID: {type: DataTypes.BIGINT, primaryKey: true},
    Level: {type: DataTypes.BIGINT, defaultValue: 0},
    XP: {type: DataTypes.DECIMAL, defaultValue: 0},
    Gold: {type: DataTypes.DECIMAL, defaultValue: 0},
    Silver: {type: DataTypes.DECIMAL, defaultValue: 0},
    Bronze: {type: DataTypes.DECIMAL, defaultValue: 0},
    Donator: {type: DataTypes.BOOLEAN, defaultValue: false},
    Blacklisted: {type: DataTypes.BOOLEAN, defaultValue: false}
  });
  return User;
}
