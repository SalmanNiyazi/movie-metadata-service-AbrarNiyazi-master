import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/routes';
const app = express();
const PORT = process.env.PORT;

app.use('/api/movies', router);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
