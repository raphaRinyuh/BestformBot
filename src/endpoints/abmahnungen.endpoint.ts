import Abmahnung from '../models/abmahnungen.model';
import { collections } from '../services/database.service';
import { DbResponse } from '../types/dbResponse';

export async function getAllAbmahnungen(): Promise<DbResponse<unknown>> {
	const data = await collections.abmahnungen?.find({});

	if (!data) {
		return { response: 'There was an error fetching data from the abmahnungen collection', status: 'error' };
	}

	return { status: 'success', response: await data?.toArray() };
}

export async function countUserAbmahnungen(userId: string): Promise<DbResponse<unknown>> {
	const data = await collections.abmahnungen?.find({ target: userId });
	if (!data) {
		return { response: 'There was an error fetching data from the abmahnungen collection', status: 'error' };
	}

	return { status: 'success', response: (await data.toArray()).length };
}

export async function createNewAbmahnung(abmahnung: Abmahnung): Promise<DbResponse<unknown>> {
	const data = await collections.abmahnungen?.insertOne(abmahnung);

	if (!data) {
		return { response: 'There was an error creating data in the abmahnungen collection', status: 'error' };
	}

	return { status: 'success', response: 'created new abmahnung' };
}

export async function getAbmahnungRanking(): Promise<DbResponse<string | Map<string, number>>> {
	const data = await collections.abmahnungen?.find({}).toArray();
	const arr = new Map<string, number>();
	data?.forEach((v) => {
		if (arr.has(v.target)) {
			const temp = arr.get(v.target);
			//	@ts-expect-error temp cannot be empty at this point
			arr.set(v.target, temp + 1);
		}
		else {
			arr.set(v.target, 1);
		}
	});

	if (!data) {
		return { response: 'A Abmahnungen Ranking could not be established', status: 'error' };
	}
	const mapSort1 = new Map([...arr.entries()].sort((a, b) => b[1] - a[1]));
	return { status: 'success', response: mapSort1 };
}
