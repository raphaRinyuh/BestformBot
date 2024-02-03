type status = successStatus | errorStatus
type successStatus = 'success';
type errorStatus = 'error'

export interface DbResponse {
	status: status,
	response: unknown
}