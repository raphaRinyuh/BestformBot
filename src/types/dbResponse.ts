type status = successStatus | errorStatus
type successStatus = 'success';
type errorStatus = 'error'

export interface DbResponse<T> {
	status: status,
	response: T
}