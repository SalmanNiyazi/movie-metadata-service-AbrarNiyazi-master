/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/routes';
const app = express();
const PORT = process.env.PORT;
import axios from 'axios';

app.use('/api/movies', router);

async function getMetadata(PORT) {
	const one =
		'https://www.omdbapi.com/?i=tt0401792&apikey=68fd98ab&plot=full';
	const two =
		'https://www.omdbapi.com/?i=tt0097576&apikey=68fd98ab&plot=full';
	const three =
		'https://www.omdbapi.com/?i=tt0076759&apikey=68fd98ab&plot=full';
	const four =
		'https://www.omdbapi.com/?i=tt0061852&apikey=68fd98ab&plot=full';

	const requestOne = await axios.get(one);
	console.log(requestOne);
	const requestTwo = await axios.get(two);
	const requestThree = await axios.get(three);
	const requestFour = await axios.get(four);
	axios
		.all([requestOne, requestTwo, requestThree, requestFour])
		.then(
			axios.spread((...responses) => {
				const responseOne = responses[0];
				const responseTwo = responses[1];
				const responseThree = responses[2];
				const responseFour = responses[3];
				console.log(
					responseOne,
					responseTwo,
					responseThree,
					responseFour
				);
			})
		) // merge these four responses with four json objects from movies directory
		//then write them to another file
		.catch((errors) => {
			console.log(errors);
		});

	app.listen(PORT, () => {
		console.log(`Server is running on port:${PORT}`);
	});
}

getMetadata(PORT);
