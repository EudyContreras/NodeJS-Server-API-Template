import express from 'express';
import { Request, Response, Application } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
   const response = {
      message: 'Hello there'
   };
   return res.json(response);
})

app.listen(5000, () => {
   console.log('Running on port 5000');
});