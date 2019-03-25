import {Client, Collection} from 'discord.js';
import glob from 'glob';
import DB from './Database/index.js';

require('dotenv').config();

const LAPSUS = new Client();

LAPSUS.commands = new Collection();
LAPSUS.aliases = new Collection();

glob(__dirname + '/Events/**/*.js', async (er, files) => {
    console.log(`Foram encontrados ${files.length} eventos para carregar.`);

    files.forEach(file => {
        let event = require(file);
        LAPSUS.on(event.name, (...args) => {
            event.run(LAPSUS, ...args);
            delete require.cache[require.resolve(file)];
        });
    });
});

glob(__dirname + '/Commands/**/*.js', async (er, files) => {
    console.log(`Eventos carregados!\nCarregando ${files.length} comandos...`);
    files.forEach(cfile => {
        cfile = require(cfile);
        console.log(`Comando ${cfile.options.name} carregado!`)
        LAPSUS.commands.set(cfile.options.name, cfile);
        cfile.options.aliases.forEach(alias => {
            LAPSUS.aliases.set(alias, cfile.options.name);
        });
    });
});

LAPSUS.login(process.env.TOKEN);

export default LAPSUS;
