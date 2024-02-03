import { Client, Events, Interaction } from 'discord.js';

export const handleSlashCommand = async (bot: Client) => {
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
};