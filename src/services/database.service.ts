// External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

// Global Variables
export const collections: { abmahnungen?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToMongoDatabase() {
	dotenv.config();

	if (!process.env.DB_CONN_STRING || !process.env.ABMAHNUNGEN_COLLECTION_NAME) return console.error('Required .env values are missing');

	const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
	await client.connect();

	const db: mongoDB.Db = client.db(process.env.DB_NAME);

	const abmahnungenCollection: mongoDB.Collection = db.collection(process.env.ABMAHNUNGEN_COLLECTION_NAME);
	collections.abmahnungen = abmahnungenCollection;

	console.info(`Successfully connected to database: ${db.databaseName} and collection: ${abmahnungenCollection.collectionName}`);
}