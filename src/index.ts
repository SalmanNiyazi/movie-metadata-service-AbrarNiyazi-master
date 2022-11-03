/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/routes';
const app = express();
const PORT = process.env.PORT;
import axios from 'axios';
import { changeData, mergeMovie, writeMergedMovies } from '../utils/utils';

app.use('/api/movies', router);
async function getMetadata(PORT: any) {
	const one = `${process.env.BASE_URL}/?i=tt0401792&apikey=${process.env.API_KEY}&plot=full`;
	const two = `${process.env.BASE_URL}/?i=tt0097576&apikey=${process.env.API_KEY}&plot=full`;
	const three = `${process.env.BASE_URL}/?i=tt0076759&apikey=${process.env.API_KEY}&plot=full`;
	const four = `${process.env.BASE_URL}/?i=tt0061852&apikey=${process.env.API_KEY}&plot=full`;

	const requestOne = await axios.get(one);
	const requestTwo = await axios.get(two);
	const requestThree = await axios.get(three);
	const requestFour = await axios.get(four);
	axios
		.all([requestOne, requestTwo, requestThree, requestFour])
		.then(
			axios.spread((...responses: any) => {
				const responseOne = responses[0].data;
				const responseTwo = responses[1].data;
				const responseThree = responses[2].data;
				const responseFour = responses[3].data;

				return [responseOne, responseTwo, responseThree, responseFour];
			})
		)
		.then(async (result) => {
			const mergedData = await mergeMovie(result);
			return mergedData;
		})
		.then(async (result) => {
			const changedData = await changeData(result);
			return changedData;
		})
		.then(async (result) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const mergedMovies = await writeMergedMovies(result);
			return false;
		})
		.catch((errors) => {
			console.log(errors);
		});

	app.listen(PORT, () => {
		console.log(`Server is running on port:${PORT}`);
	});
}

getMetadata(PORT);