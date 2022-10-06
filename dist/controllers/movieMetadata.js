"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieMetData = void 0;
const metaDataService_1 = require("../services/metaDataService");
const movieMetData = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(200).send({
            stauts: 'SUCCESS',
        });
    }
    if (id) {
        const mergedData = (0, metaDataService_1.dataMerger)(id);
        if (!mergedData) {
            return res.status(200).send({
                status: 'Nothing to show',
            });
        }
    }
};
exports.movieMetData = movieMetData;
