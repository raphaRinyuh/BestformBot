import { ObjectId } from 'mongodb';

export default class Abmahnung {
	private id: Uint8Array;
	public target: string;
	public reason: string;
	public createdBy: string;
	public createdAt: Date;

	constructor(target: string, reason: string, createdBy: string, createdAt: Date) {
		this.id = ObjectId.generate();
		this.target = target;
		this.reason = reason;
		this.createdAt = createdAt;
		this.createdBy = createdBy;
	}
}