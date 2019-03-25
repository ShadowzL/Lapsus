import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';

const sequelize = new Sequelize('Lapsus', 'postgres', 'lapsus123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

var models = {};

fs.readdirSync(__dirname + '/Models/').forEach((filename) => {
    var model = {};
    model.path = path.join(__dirname, '/Models/', filename)
    model.name = filename.replace(/\.[^/.]+$/, "");
    model.resource = sequelize.import(model.path);
    models[model.name] = model;
});

const DB = sequelize.models;

DB.User.sync();
DB.Server.sync();

export default DB;
