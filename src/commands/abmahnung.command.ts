import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abmahnung')
		.setDescription('Verteile eine Abmahnung')
		.addUserOption(options =>
			options
				.setName('target')
				.setDescription('Who gets the Abmahnung')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Connect)
		.setDMPermission(false),
	async execute(interaction: CommandInteraction) {
		const target = interaction.options.getUser('target') ?? 'User not found';
		await interaction.reply(`${target}`);
	},
};