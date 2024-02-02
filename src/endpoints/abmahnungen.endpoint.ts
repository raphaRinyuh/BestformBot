/* eslint-disable indent */
import { ObjectId } from 'mongodb';
import { collections } from 'src/services/database.service';
import Abmahnung from 'src/models/abmahnungen.model';
import { endpointMethod } from 'src/types/endpointTypes';
import { DbResponse } from 'src/types/dbResponse';

export async function abmahnungEndpoint(method: endpointMethod, data?: object): Promise<DbResponse | undefined> {
	switch (method) {
		case 'GET': {
			return await get();
		}
		case 'POST': {
			if (!data) return;
			return await post(data as Abmahnung);
		}
		case 'PUT': {
			return await put();
		}
		case 'DELETE': {
			return await del();
		}
	}
}

async function get(id?: Uint8Array): Promise<DbResponse> {
	if (!collections.abmahnungen) {
		return {
			response: 'Connection to collection: abmahnung could not be established',
			status: 'error',
		};
	}
	if (id) {
		const abmahnung = await collections.abmahnungen.findOne({ _id: new ObjectId(id) });
		if (abmahnung) {
			return { response: abmahnung.toJSON(), status: 'success' };
		}
		else {
			return { response: 'There was an error while retrieving the Abmahnung', status: 'error' };
		}
	}
	else {
		const abmahnungen = await collections.abmahnungen.find({});
		if (abmahnungen) {
			return { response: JSON.stringify(abmahnungen.toArray()), status: 'success' };
		}
		else {
			return { response: 'There was an error while retrieving the Abmahnung', status: 'error' };
		}
	}
}
async function post(data: Abmahnung): Promise<DbResponse> {
	if (!collections.abmahnungen) {
		return {
			response: 'Connection to collection: abmahnung could not be established',
			status: 'error',
		};
	}
	const result = await collections.abmahnungen.insertOne(data);

	if (result) {
		return { response: `Created new abmahnung with id ${result.insertedId}`, status: 'success' };
	}
	else {
		return { response: 'There was an error while creating a Abmahnung', status: 'error' };
	}
}
async function put(): Promise<DbResponse> {
	throw Error;
}
async function del(): Promise<DbResponse> {
	throw Error;
}
