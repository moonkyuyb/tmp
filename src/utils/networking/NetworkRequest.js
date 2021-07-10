export const fetchWithTimeout = (promisedFetch, timeout = 5000) => {
	const timeoutReject = new Promise((_,reject) => {
		setTimeout(() => {
			reject(new Error('요청시간이 초과되었습니다. 인터넷 연결을 확인해주세요.'))
		},timeout)
	})
	return new Promise.race([promisedFetch, timeoutReject])
}