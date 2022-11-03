/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import fs from 'fs';
import { searchMovieByField } from '../../utils/utils';
export const movieMetData: RequestHandler = async (req: any, res: any) => {
	const id = req.params.id;
	const query = req.query;
	const movieData = fs.readFileSync('mergedMovies.json', {
		encoding: 'utf8',
	});

	const data = JSON.parse(movieData);
	if (!id) {
		if (Object.keys(query).length === 0 && query.constructor === Object) {
			return res.status(200).send({
				status: 'success',
				data,
			});
		}
		if (Object.keys(query).length !== 0 && query.constructor === Object) {
			for (const searchField in query) {
				const searchedMovie = await searchMovieByField(
					data,
					searchField,
					query[searchField]
				);
				if (searchedMovie.length != 0) {
					return res.status(200).send({
						status: 'success',
						searchedMovie,
					});
				}
				if (searchedMovie.length == 0) {
					return res.status(404).send({
						status: 'failed',
						message: 'No movie found',
					});
				}
			}
			return res.status(400).send({
				status: 'failed',
				message: 'endpoint under construction',
			});
		}
	}

	if (id) {
		const movie = data.filter((item: any) => {
			if (item.imdbID == id || item.id == id) {
				return item;
			}
		});
		if (movie.length != 0) {
			return res.status(200).send({
				status: 'success',
				movie,
			});
		}
		if (movie.length == 0) {
			return res.status(200).send({
				status: 'failed',
				message: 'No movie found with this id',
			});
		}
	}
};