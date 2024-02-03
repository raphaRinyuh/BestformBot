import { CommandInteraction, SlashCommandBuilder, User } from 'discord.js';
import { countUserAbmahnungen } from '../endpoints/abmahnungen.endpoint';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count_abmahnung')
		.setDescription('Finde heraus wie viel Abmahnungen ein User gesammelt hat')
		.addUserOption(options =>
			options
				.setName('target')
				.setDescription('Der User wessen Abmahnungen gezählt werden sollen')
				.setRequired(true))
		.setDMPermission(false),
	async execute(interaction: CommandInteraction) {
		if (!interaction.isChatInputCommand()) return;
		const { target, count } = await countAbmahnungen(interaction);

		await interaction.reply(`${target} hat schon ${count} Abmahnungen gesammelt`);
	},
};

async function countAbmahnungen(interaction: CommandInteraction): Promise<{ target: User, count: number }> {
	if (!interaction.isChatInputCommand()) throw Error('Interaction is no ChatInputCommand');
	const target = interaction.options.getUser('target');
	if (!target) throw Error('No Target found');

	const response = await countUserAbmahnungen(target.id);
	console.log(response.status);

	return { target: target, count: response.response as number };
}
