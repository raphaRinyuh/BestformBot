import { APIEmbedField, Client, Embed, EmbedBuilder, TextChannel } from 'discord.js';
import { getAllStatusWithIssueCount } from '../endpoints/jira.endpoint';

//	Global functions
export async function sendJiraStatisticsMessage(bot: Client) {

	// @ts-expect-error Channel always has name
	const channel1: TextChannel = await bot.channels.cache.find(channel => channel.name === '👨💼jira-api');
	if (!channel1) return;

	const channel1Messages = await channel1.messages.fetch();
	channel1.bulkDelete(channel1Messages);
	const msg = await channel1.send({ embeds: [await generateJiraStatisticsEmbed() as Embed] });

	setInterval(async () => {
		console.log('refresh');
		msg.edit({ embeds: [await generateJiraStatisticsEmbed() as Embed] });
	}, 300000);

}

//	Local functions
const generateJiraStatisticsEmbed = async (): Promise<Partial<Embed> | undefined> => {
	const fields = await prepareEmbedFields();
	const embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Jira Statistiken')
		.setAuthor({ name: 'Wocken IT Partner Shopware Abteilung', url: 'https://wocken-it.com' })
		.addFields(fields);

	return embed;
};

const prepareEmbedFields = async (): Promise<APIEmbedField[]> => {
	const final: APIEmbedField[] = [];
	const arr = await getAllStatusWithIssueCount();

	(Array.from(arr)).forEach((value) => {
		final.push({ name: value[0], value: `${value[1]}`, inline: false });
	});
	return final;
};