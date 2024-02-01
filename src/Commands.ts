import { Client, Collection, REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';

export const setClientCommands = (bot: Client) => {
	bot.commands = new Collection();

	const commandsLocal: object[] = [];
	const folderPath = path.join(__dirname, 'commands');
	const commands = fs.readdirSync(folderPath).filter(file => file.endsWith('.command.ts'));

	for (const file of commands) {
		const filePath = path.join(folderPath, file);
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			bot.commands.set(command.data.name, command);
			commandsLocal.push(command.data.toJSON());
		}
		else {
			console.warn(`The command at ${filePath} is missing a required property`);
		}
	}

	if (!process.env.BOT_TOKEN) {
		return;
	}
	const rest = new REST().setToken(process.env.BOT_TOKEN);

	// and deploy your commands!
	(async () => {
		try {
			if (!process.env.APP_ID || !process.env.GUILD_ID) {
				return;
			}

			console.log(`Started refreshing ${commandsLocal.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationCommands(process.env.APP_ID),
				{ body: commandsLocal },
			);

			//	@ts-expect-error Unknown Variable
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		}
		catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
};
