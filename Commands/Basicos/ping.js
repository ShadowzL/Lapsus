module.exports = {
    options: {
        name: 'ping',
        aliases: ['p']
    },

    run: async (DB, LAPSUS, message) => {
        message.channel.send('Pong!');
    }
};
