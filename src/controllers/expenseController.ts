import { Request, Response } from 'express';
import { DataSource  } from 'typeorm';
import { Expense } from '../entities/Expense';

export const getExpenses = async (_req: Request, res: Response) => {
      const AppDataSource = new DataSource({
         // type: "postgres",
         // host: "localhost",
         // port: 5432,
         // username: "expense_tracker",
         // password: "expense-tracker",
         // database: "expense_tracker",
         // entities: [Expense],
         // synchronize: true,
         // logging: false,
         type: "postgres",
         host: "roundhouse.proxy.rlwy.net",
         port: 21769,
         username: "postgres",
         password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
         database: "railway",
         entities: [Expense],
         synchronize: true,
         logging: false,
         })
         await AppDataSource.initialize()
         .then(async (connection: any) => {
            const expenses = await connection.getRepository(Expense).createQueryBuilder()
            .select('*')
            .orderBy('id')
            .execute()
            res.json(expenses)
         })
};

export const getExpenseById = async (req: Request, res: Response) => {
   const AppDataSource = new DataSource({
      // type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "expense_tracker",
      // password: "expense-tracker",
      // database: "expense_tracker",
      // entities: [Expense],
      // synchronize: true,
      // logging: false,
      type: "postgres",
      host: "roundhouse.proxy.rlwy.net",
      port: 21769,
      username: "postgres",
      password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
      database: "railway",
      entities: [Expense],
      synchronize: true,
      logging: false,
      })
      await AppDataSource.initialize()
      .then(async (connection: any) => {
         const expense = await connection.getRepository(Expense).findOneBy({
            id: req.body.id
         });
         res.json(expense)
      })
};

export const updateExpense = async (req: Request, res: Response) => {
   const { description, amount, date, id } = req.body;

   if (!description || !amount || !date) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
   }

   const expense = new Expense();
   expense.description = description;
   expense.amount = amount;
   expense.date = date;
   expense.id = id

   const AppDataSource = new DataSource({
      // type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "expense_tracker",
      // password: "expense-tracker",
      // database: "expense_tracker",
      // entities: [Expense],
      // synchronize: true,
      // logging: false,
      type: "postgres",
      host: "roundhouse.proxy.rlwy.net",
      port: 21769,
      username: "postgres",
      password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
      database: "railway",
      entities: [Expense],
      synchronize: true,
      logging: false,
      })
      await AppDataSource.initialize()
      .then(async connection => {
         try {
            await connection.getRepository(Expense).createQueryBuilder()
            .update(Expense)
            .set({
               description: expense.description,
               amount: expense.amount,
               date: expense.date
            })
            .where("id = :id", {id: expense.id})
            .execute()
         } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
         }
      })
};

export const addExpense = async (req: Request, res: Response) => {
   new Promise(async (resolve) => {
      const { description, amount, date } = req.body;

      if (!description || !amount || !date) {
         return res.status(400).json({ message: 'Please provide all required fields.' });
      }

      const expense = new Expense();
      expense.description = description;
      expense.amount = amount;
      expense.date = date;

      const AppDataSource = new DataSource({
         // type: "postgres",
         // host: "localhost",
         // port: 5432,
         // username: "expense_tracker",
         // password: "expense-tracker",
         // database: "expense_tracker",
         // entities: [Expense],
         // synchronize: true,
         // logging: false,
         type: "postgres",
         host: "roundhouse.proxy.rlwy.net",
         port: 21769,
         username: "postgres",
         password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
         database: "railway",
         entities: [Expense],
         synchronize: true,
         logging: false,
         })
         await AppDataSource.initialize()
         .then(async connection => {
            try {
               await connection.getRepository(Expense).save(expense);
               res.json(expense);
            } catch (error) {
               console.error(error);
               res.status(500).json({ message: 'Internal Server Error' });
            }
         })
      resolve({
         statuscode: 200
      })
   })
};

export const deleteExpense = async (req: Request, res: Response) => {
   const { description, amount, date, id } = req.body;

   if (!description || !amount || !date) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
   }

   const expense = new Expense();
   expense.description = description;
   expense.amount = amount;
   expense.date = date;
   expense.id = id;

   const AppDataSource = new DataSource({
      // type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "expense_tracker",
      // password: "expense-tracker",
      // database: "expense_tracker",
      // entities: [Expense],
      // synchronize: true,
      // logging: false,
      type: "postgres",
      host: "roundhouse.proxy.rlwy.net",
      port: 21769,
      username: "postgres",
      password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
      database: "railway",
      entities: [Expense],
      synchronize: true,
      logging: false,
      })
      await AppDataSource.initialize()
      .then(async (connection: any) => {
         const expenses = await connection.createQueryBuilder()
         .delete()
         .from(Expense)
         .where("id = :id", {id: expense.id})
         .execute()
         res.json(expenses);
      })
        
};
