export default class Abmahnung {
	public target: string;
	public reason: string;
	public createdBy: string;
	public createdAt: Date;

	constructor(target: string, reason: string, createdBy: string, createdAt: Date) {
		this.target = target;
		this.reason = reason;
		this.createdAt = createdAt;
		this.createdBy = createdBy;
	}
}