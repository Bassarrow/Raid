const readline = require('readline');
const { ascii_account } = require('./ascii.js');
const presence = require('./presence.js');
const { Client, GatewayIntentBits } = require('discord.js-selfbot-v13');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("C'est quoi ton token ? ", function (choix) {
    const token = choix.trim();
    console.clear();
    console.log(ascii_bot.art);

    client.on("ready", async () => {
        console.log(` Connecté en tant que ${client.user.tag}\n`);

    
        client.user.setPresence({
            status: presence.status,
            activities: [{
                name: presence.activity.name,
                type: presence.activity.type,
                assets: {
                    largeImage: presence.activity.assets.largeImage,
                    largeText: presence.activity.assets.largeText
                }
            }]
        });

    
        for (const [guildId, guild] of client.guilds.cache) {
            console.log(` Serveur : ${guild.name}`);

            try {
                const channels = await guild.channels.fetch();
                channels.forEach(channel => {
                    if (channel.manageable && (channel.type === 0 || channel.type === 2)) {
                        channel.setName("your text").then(() => {
                            console.log(` Salon renommé : ${channel.name}`);
                        }).catch(err => {
                            console.warn(` Erreur salon (${channel.name}) : ${err.message}`);
                        });
                    }
                });
            } catch (err) {
                console.error(" Erreur en récupérant les salons :", err.message);
            }

            try {
                const roles = await guild.roles.fetch();
                roles.forEach(role => {
                    if (role.editable && role.name !== "@everyone") {
                        role.setName("your text").then(() => {
                            console.log(` Rôle renommé : ${role.name}`);
                        }).catch(err => {
                            console.warn(` Erreur rôle (${role.name}) : ${err.message}`);
                        });
                    }
                });
            } catch (err) {
                console.error(" Erreur en récupérant les rôles :", err.message);
            }
        }
    });

    client.login(token).catch(err => {
        console.error(" Token invalide :", err.message);
    });

    rl.close();
});
