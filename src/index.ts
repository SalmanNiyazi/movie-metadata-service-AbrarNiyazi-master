import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response }  from 'express';
const app = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
