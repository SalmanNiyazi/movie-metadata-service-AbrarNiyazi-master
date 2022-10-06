"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieMetadata_1 = require("../controllers/movieMetadata");
const router = (0, express_1.Router)();
router.get('/:id?', movieMetadata_1.movieMetData);
exports.default = router;
