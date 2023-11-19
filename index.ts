import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import expenseRoutes from './src/routes';
import { Connection } from './src/Connection'
import cors from 'cors';

const connection = new Connection()

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
   origin: 'https://mschaferg.github.io'
   // origin: 'http://localhost:4200'
}))
app.use(bodyParser.json());
app.use('/', expenseRoutes);

connection.connection()
   .then(() => {
      app.listen(port, () => {
         console.log(`Server is running on https://node-expense-tracker-production.up.railway.app`);
      });
   })
   .catch((error) => console.log('TypeORM connection error: ', error));
