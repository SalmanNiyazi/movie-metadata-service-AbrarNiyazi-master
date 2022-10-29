/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

export const movieMetData: RequestHandler = async (req: any, res: any) => {
	const id = req.params.id;
	//const searcObject = req.query.seachObject;
	//loop over the objects and match that object ,
	// if matches send the response
	//else a message that object doesnot exist
	if (!id) {
		//return entire file of merged data to user
	}
	if (id) {
		//loop over each object in file and return the object wehere id matches
	}
};

