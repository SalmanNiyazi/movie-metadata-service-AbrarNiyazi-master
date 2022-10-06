import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export const dataMerger = async (id: string) => {
	console.log(id);
	try {
		const OMDBData = await axios.get<AxiosResponse>(
			`https://www.omdbapi.com/?i=${id}&apikey=68fd98ab&plot=full`
		);
		console.log(JSON.stringify(OMDBData));
	} catch (error) {
		console.log(error);
		if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message);
			return error.message;
		} else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		}
	}
};
