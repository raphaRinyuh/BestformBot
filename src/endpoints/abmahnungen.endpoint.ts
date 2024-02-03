/* eslint-disable indent */

import Abmahnung from '../models/abmahnungen.model';
import { collections } from '../services/database.service';
import { DbResponse } from '../types/dbResponse';

export async function getAllAbmahnungen(): Promise<DbResponse> {
	const data = await collections.abmahnungen?.find({});

	if (!data) {
		return { response: 'There was an error fetching data from the abmahnungen collection', status: 'error' };
	}

	return { status: 'success', response: data?.toArray() };
}

export async function countUserAbmahnungen(userId: string): Promise<DbResponse> {
	const data = await collections.abmahnungen?.find({ target: userId });
	if (!data) {
		return { response: 'There was an error fetching data from the abmahnungen collection', status: 'error' };
	}

	return { status: 'success', response: (await data.toArray()).length };
}

export async function createNewAbmahnung(abmahnung: Abmahnung): Promise<DbResponse> {
	const data = await collections.abmahnungen?.insertOne(abmahnung);

	if (!data) {
		return { response: 'There was an error creating data in the abmahnungen collection', status: 'error' };
	}

	return { status: 'success', response: 'created new abmahnung' };
}

