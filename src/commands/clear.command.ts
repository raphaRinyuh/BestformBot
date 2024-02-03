import { CommandInteraction, SlashCommandBuilder, TextChannel } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear_messages')
		.setDescription('Lösche alle Nachrichten aus einem Channel'),
	async execute(interaction: CommandInteraction) {
		if (!interaction.isChatInputCommand()) return;

		const channel = interaction.channel;
		if (!channel) return;
		const messages = await channel.messages.fetch();
		(channel as TextChannel).bulkDelete(messages);

		await interaction.reply({ content: 'Messages have been cleared', ephemeral: true });
	},
};
