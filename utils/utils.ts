/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { DBMovie, OMDBMovie, Rating, MergedMovie } from '../types/types';
import fs from 'fs';
import movie1 from '../movies/3532674.json';
import movie2 from '../movies/5979300.json';
import movie3 from '../movies/11043689.json';
import movie4 from '../movies/11528860.json';

export async function writeMergedMovies(mergedMovies: any) {
	const writeMovies = fs.writeFile(
		'mergedMovies.json',
		JSON.stringify(mergedMovies),
		(err) => {
			if (err) {
				console.log(err);
				return err;
			} else {
				console.log('File written successfully\n');
				return true;
			}
		}
	);
}

export async function mergeMovie(OMDBMOvies: any) {
	const mergedObject1 = Object.assign(OMDBMOvies[0], movie1);
	const mergedObject2 = Object.assign(OMDBMOvies[1], movie2);
	const mergedObject3 = Object.assign(OMDBMOvies[2], movie3);
	const mergedObject4 = Object.assign(OMDBMOvies[3], movie4);

	return [mergedObject1, mergedObject2, mergedObject3, mergedObject4];
}

export async function changeData(mergedMovies: any) {
	for (let i = 0; i < 4; i++) {
		if (mergedMovies[i]?.Title) {
			mergedMovies[i].title = mergedMovies[i].Title;
			delete mergedMovies[i].Title;
		}
		if (mergedMovies[i]?.Plot) {
			mergedMovies[i].description = mergedMovies[i].Plot;
			delete mergedMovies[i].Plot;
		}
		if (mergedMovies[i]?.duration) {
			mergedMovies[i].Runtime = String(mergedMovies[i].duration) + ' min';
			delete mergedMovies[i].duration;
		}
		if (mergedMovies[i]?.Director) {
			mergedMovies[i].Director = mergedMovies[i].Director.split(' ');
		}
		if (mergedMovies[i]?.Actors) {
			mergedMovies[i].Actors = mergedMovies[i].Actors.split(' ');
		}
		if (mergedMovies[i]?.Writer) {
			mergedMovies[i].Writer = mergedMovies[i].Writer.split(' ');
		}
		if (mergedMovies[i].userrating) {
			mergedMovies[i].Ratings.push(
				addAvgUserRating(mergedMovies[i].userrating)
			);
			delete mergedMovies[i].userrating;
		}
	}
	return mergedMovies;
}

export async function addAvgUserRating(userating: any) {
	const totalStars =
		userating.countStar5 * 5 +
		userating.countStar4 * 4 +
		userating.countStar3 * 3 +
		userating.countStar2 * 2 +
		userating.countStar1 * 1;
	const avgRating = totalStars / userating.countTotal;
	return {
		Source: 'User Rating',
		Value: String(avgRating.toPrecision(2)) + '/5.0',
	};
}

export async function searchMovieByField(
	mergedMovies: any,
	searchField: any,
	searchValue: any
) {
	searchField = searchField.toLowerCase();
	searchValue = searchValue.toLowerCase();

	const movie = mergedMovies.filter((movie: any) => {
		searchMovie(mergedMovies, searchField, searchValue);
	});
	console.log(movie);
	return movie;
}

export async function searchMovie(
	mergedMovies: any,
	searchField: any,
	searchValue: any
) {
	for (let i = 0; i < 4; i++) {
		for (const [key, value] of Object.entries(mergedMovies[i])) {
			if (key.toLowerCase() == searchField) {
				console.log(key);
				if (value == searchValue.toLowerCase()) {
					return { searchField: searchValue };
				}
			}
		}

		// if (!mergedMovies[i][searchField]) {
		// 	console.log('1st if ---->', mergedMovies[i][searchField]);
		// 	return false;
		// }
		// if (typeof mergedMovies[i][searchField] === 'string') {
		// 	// if search field is string check equality
		// 	console.log('2nd if --// if (!mergedMovies[i][searchField]) {
		// 	console.log('1st if ---->', mergedMovies[i][searchField]);
		// 	return false;
		// }-->', mergedMovies[i][searchField]);
		// 	return mergedMovies[i][searchField].toLowerCase() === searchValue;
		// } else if (typeof mergedMovies[i][searchField] === 'number') {
		// 	// if search field is number check equality
		// 	console.log('3rd if ---->', mergedMovies[i][searchField]);
		// 	return String(mergedMovies[i][searchField]) === searchValue;
		// } else if (Array.isArray(mergedMovies[i][searchField])) {
		// 	// if search field is array check if array contains search term
		// 	mergedMovies[i][searchField] = mergedMovies[i][searchField].map(
		// 		(v: any) => v.toLowerCase()
		// 	);
		// 	console.log('4th if ---->', mergedMovies[i][searchField]);
		// 	// console.log('2----->', );
		// 	return mergedMovies[i][searchField].includes(searchValue);
		// }
		// return false;
	}
}