import { Request, RequestHandler, Response } from 'express';
import { dataMerger } from '../services/metaDataService';

export const movieMetData: RequestHandler = (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(200).send({
			stauts: 'SUCCESS',
		});
	}
	if (id) {
		const mergedData = dataMerger(id);
		if (!mergedData) {
			return res.status(200).send({
				status: 'Nothing to show',
			});
		}
	}
};
