import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { setClientCommands } from './Commands';
import { sendAbmahnungenRankingMessage } from './embeds/abmahnungRanking.embed';
import connectToMongoDatabase from './services/database.service';
import { handleSlashCommand } from './services/handleSlashCommand.service';
dotenv.config();

const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

bot.once(Events.ClientReady, async readyClient => {
	await connectToMongoDatabase();
	console.log(`logged in as ${readyClient.user.tag}`);
	sendAbmahnungenRankingMessage(bot);
});
setClientCommands(bot);
handleSlashCommand(bot);

bot.login(process.env.BOT_TOKEN);
