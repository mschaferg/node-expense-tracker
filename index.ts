import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import expenseRoutes from './src/routes';
import { Connection } from './src/Connection'
import cors from 'cors';

const connection = new Connection()

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors({
   origin: 'http://localhost:4200'
}))
app.use('/', expenseRoutes);

connection.connection()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
      });
   })
   .catch((error) => console.log('TypeORM connection error: ', error));
