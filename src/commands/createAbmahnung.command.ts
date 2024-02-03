import { CommandInteraction, SlashCommandBuilder, User } from 'discord.js';
import { createNewAbmahnung } from '../endpoints/abmahnungen.endpoint';
import Abmahnung from '../models/abmahnungen.model';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_abmahnung')
		.setDescription('Verteile eine Abmahnung')
		.addUserOption(options =>
			options
				.setName('target')
				.setDescription('Wer bekommt die Abmahnung')
				.setRequired(true))
		.addStringOption(options =>
			options
				.setName('reason')
				.setDescription('Warum kassiert er die Abmahnung?')
				.setRequired(true))
		.setDMPermission(false),
	async execute(interaction: CommandInteraction) {
		if (!interaction.isChatInputCommand()) return;
		const { target, reason } = await addAbmahnungToDb(interaction);

		await interaction.reply(`${target} kassiert eine Abmahnung mit dem Grund: ${reason}`);
	},
};

async function addAbmahnungToDb(interaction: CommandInteraction): Promise<{ target: User, reason: string }> {
	if (!interaction.isChatInputCommand()) throw Error('Interaction is no ChatInputCommand');
	const target = interaction.options.getUser('target');
	if (!target) throw Error('No Target found');
	const reason = interaction.options.getString('reason') ?? 'No Reason provided';

	await createNewAbmahnung(new Abmahnung(target.id, reason, interaction.user.id, new Date()));

	return { target: target, reason: reason };
}
