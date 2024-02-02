import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits, Interaction } from 'discord.js';
import { setClientCommands } from './Commands';
import { connectToMongoDatabase } from './services/database.service';
import { abmahnungEndpoint } from './endpoints/abmahnungen.endpoint';

connectToMongoDatabase();
const data = abmahnungEndpoint('GET');

console.log(data);

dotenv.config();

console.log('Client is starting...');

const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

bot.once(Events.ClientReady, async readyClient => {
	console.log(`logged in as ${readyClient.user.tag}`);
});

setClientCommands(bot);
bot.on(Events.InteractionCreate, async (interaction: Interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No Command matching ${interaction.commandName} found`);
	}

	try {
		await command?.execute(interaction);
	}
	catch (e: unknown) {
		console.error(e);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

bot.login(process.env.BOT_TOKEN);
