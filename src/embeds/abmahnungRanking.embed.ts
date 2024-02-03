import { Client, Embed, EmbedBuilder, TextChannel } from 'discord.js';
import { getAbmahnungRanking } from '../endpoints/abmahnungen.endpoint';

const generateAbmahnungRankingEmbed = async (): Promise<Partial<Embed> | undefined> => {

	const data = (await getAbmahnungRanking()).response;
	if (!(data instanceof Map)) {
		return;
	}

	const embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Abmahnungen Ranking')
		.setAuthor({ name: 'Wocken IT Partner Shopware Abteilung', url: 'https://wocken-it.com' })
		.addFields(
			{ name: 'Platz 1', value: Array.from(data)[0] ? '<@' + Array.from(data)[0][0] + '> - ' + Array.from(data)[0][1] + ' Abmahnung(en)' : 'No User found' },
			{ name: 'Platz 2', value: Array.from(data)[1] ? '<@' + Array.from(data)[1][0] + '> - ' + Array.from(data)[1][1] + ' Abmahnung(en)' : 'No User found' },
			{ name: 'Platz 3', value: Array.from(data)[2] ? '<@' + Array.from(data)[2][0] + '> - ' + Array.from(data)[2][1] + ' Abmahnung(en)' : 'No User found' },
		);

	return embed;
};

export async function sendAbmahnungenRankingMessage(bot: Client) {

	// @ts-expect-error Channel always has name
	const channel1: TextChannel = await bot.channels.cache.find(channel => channel.name === '👑ranking');
	if (!channel1) return;

	const channel1Messages = await channel1.messages.fetch();
	channel1.bulkDelete(channel1Messages);
	const msg = await channel1.send({ embeds: [await generateAbmahnungRankingEmbed() as Embed] });

	setInterval(async () => {
		console.log('refresh');
		msg.edit({ embeds: [await generateAbmahnungRankingEmbed() as Embed] });
	}, 300000);

}