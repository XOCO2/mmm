const {prefix} = require('../jsons/config.json');
const { Collection, Client, Message } = require('discord.js');
const delay = new Collection();
const ms = require('ms')

module.exports = {
    name: 'messageCreate',
    on: true,
    /**
     * @param {Client} client 
     * @param {Message} message 
     */
    async execute(client, message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/); 
        const command = args.shift().toLowerCase();
        try {
            let commandFiles = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            if (commandFiles){
                const authorPerms = message.channel.permissionsFor(message.author);
                if(commandFiles.permissions){
                    if(!authorPerms || !authorPerms.has(commandFiles.permissions)){
                        return message.reply('you do not have the required permissions to execute that command!')
                        .then((sent) => setTimeout(() => sent.delete(), 5000));
                    }
                };
                if (commandFiles.cooldown) {
                    if (delay.has(`${commandFiles.name}-${message.author.id}`)) return message.reply(`You can use this command again after **${ms(delay.get(`${commandFiles.name}-${message.author.id}`) - Date.now(), { long: true }).includes('ms') ? '0 second' : ms(delay.get(`${commandFiles.name}-${message.author.id}`) - Date.now(), { long: true })}**`)
                    .then((sent) => setTimeout(() => sent.delete(), 5000));
                    delay.set(`${commandFiles.name}-${message.author.id}`, Date.now() + commandFiles.cooldown)
                    setTimeout(() => {
                        delay.delete(`${commandFiles.name}-${message.author.id}`);
                    }, commandFiles.cooldown)
                    if(authorPerms.has(commandFiles.permissions)){
                        delay.delete(`${commandFiles.name}-${message.author.id}`);
                    }
                }
                await commandFiles.execute(client, message, args); 
            };
        } catch (error) {
            console.log(error.message);
            message.reply('there was an error trying to execute that command!');
        }
    }
}