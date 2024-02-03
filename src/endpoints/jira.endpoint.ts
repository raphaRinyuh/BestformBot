import dotenv from 'dotenv';
dotenv.config();

export const getAllStatus = async (): Promise<string[]> => {
	const res = await fetch('https://ralbers.atlassian.net/rest/api/latest/status', {
		method: 'GET',
		headers: {
			authorization: `Basic ${process.env.JIRA_API_KEY}`,
		},
	});
	const data = await res.json();
	const dataArray = Array.from(data);
	const final: string[] = [];
	dataArray.forEach((e) => {
		//	@ts-expect-error does not know schema of status
		final.push(e.name);
	});

	return final;
};

export const getAllStatusWithIssueCount = async () => {
	const res = await fetch('https://ralbers.atlassian.net/rest/api/latest/search?fields=description,status', {
		method: 'GET',
		headers: {
			authorization: `Basic ${process.env.JIRA_API_KEY}`,
		},
	});
	const data = await res.json();
	const dataArray = Array.from(data.issues);
	const final: Map<string, string> = new Map<string, string>();
	dataArray.forEach((e) => {
		//	@ts-expect-error does not know schema of status
		if (final.has(e.fields.status.name)) {
			//	@ts-expect-error does not know schema of status
			final.set(e.fields.status.name, final.get(e.fields.status.name) + 1);
		}
		else {
			//	@ts-expect-error does not know schema of status
			final.set(e.fields.status.name, 1);
		}
	});
	return final;
};