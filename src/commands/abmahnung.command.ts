import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abmahnung')
		.setDescription('Verteile eine Abmahnung')
		.addUserOption(options =>
			options
				.setName('target')
				.setDescription('Who gets the Abmahnung')
				.setRequired(true))
		.addStringOption(options =>
			options
				.setName('reason')
				.setDescription('Warum kassiert er die Abmahnung?')
				.setRequired(true))
		.setDMPermission(false),
	async execute(interaction: CommandInteraction) {
		if (!interaction.isChatInputCommand()) return;

		const target = interaction.options.getUser('target') ?? 'User not found';
		const reason = interaction.options.getString('reason') ?? 'No Reason provided';
		await interaction.reply(`${target} kassiert eine Abmahnung mit dem Grund: ${reason}`);
	},
};