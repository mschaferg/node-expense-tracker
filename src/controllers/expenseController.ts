import { Request, Response } from 'express';
import { DataSource  } from 'typeorm';
import { Expense } from '../entities/Expense';
import { Users } from '../entities/Users';

export const getExpenses = async (req: Request, res: Response) => {
   const rateInfo = await fetch('https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_ARKctDBRRx4BA09pNqYYBMQ7RwVaMeoDmTdTeud2')
      .then(response => response.json())

   const rate = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ARKctDBRRx4BA09pNqYYBMQ7RwVaMeoDmTdTeud2&base_currency=${req.body.base}`)
      .then(response => response.json())

      const AppDataSource = new DataSource({
         // type: "postgres",
         // host: "localhost",
         // port: 5432,
         // username: "expense_tracker",
         // password: "expense-tracker",
         // database: "expense_tracker",
         // entities: [Expense, Users],
         // synchronize: true,
         // logging: false,
         type: "postgres",
         host: "roundhouse.proxy.rlwy.net",
         port: 21769,
         username: "postgres",
         password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
         database: "railway",
         entities: [Expense, Users],
         synchronize: true,
         logging: false,
         })
         await AppDataSource.initialize()
         .then(async (connection: any) => {
            const expenses = await connection.getRepository(Expense).createQueryBuilder()
            .select('*')
            .where('user_id = :user_id', {user_id: req.body.user_id})
            .orderBy('id')
            .execute()
            res.json({
               expenses: expenses,
               rateInfo: rateInfo,
               rate: rate
            })
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
      // entities: [Expense, Users],
      // synchronize: true,
      // logging: false,
      type: "postgres",
      host: "roundhouse.proxy.rlwy.net",
      port: 21769,
      username: "postgres",
      password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
      database: "railway",
      entities: [Expense, Users],
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
      // entities: [Expense, Users],
      // synchronize: true,
      // logging: false,
      type: "postgres",
      host: "roundhouse.proxy.rlwy.net",
      port: 21769,
      username: "postgres",
      password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
      database: "railway",
      entities: [Expense, Users],
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
      const { description, amount, date, user_id } = req.body;

      if (!description || !amount || !date) {
         return res.status(400).json({ message: 'Please provide all required fields.' });
      }

      const expense = new Expense();
      expense.description = description;
      expense.amount = amount;
      expense.date = date;
      expense.user_id = user_id;

      const AppDataSource = new DataSource({
         // type: "postgres",
         // host: "localhost",
         // port: 5432,
         // username: "expense_tracker",
         // password: "expense-tracker",
         // database: "expense_tracker",
         // entities: [Expense, Users],
         // synchronize: true,
         // logging: false,
         type: "postgres",
         host: "roundhouse.proxy.rlwy.net",
         port: 21769,
         username: "postgres",
         password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
         database: "railway",
         entities: [Expense, Users],
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
      // entities: [Expense, Users],
      // synchronize: true,
      // logging: false,
      type: "postgres",
      host: "roundhouse.proxy.rlwy.net",
      port: 21769,
      username: "postgres",
      password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
      database: "railway",
      entities: [Expense, Users],
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

export const addNewUser = async (req: Request, res: Response) => {
   new Promise(async (resolve) => {
      const { username, password } = req.body;

      if (!username || !password) {
         return res.status(400).json({ message: 'Please provide all required fields.' });
      }

      const user = new Users();
      user.username = username;
      user.password = password;

      const AppDataSource = new DataSource({
         // type: "postgres",
         // host: "localhost",
         // port: 5432,
         // username: "expense_tracker",
         // password: "expense-tracker",
         // database: "expense_tracker",
         // entities: [Expense, Users],
         // synchronize: true,
         // logging: false,
         type: "postgres",
         host: "roundhouse.proxy.rlwy.net",
         port: 21769,
         username: "postgres",
         password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
         database: "railway",
         entities: [Expense, Users],
         synchronize: true,
         logging: false,
         })
         await AppDataSource.initialize()
         .then(async connection => {
            let userList = await connection.getRepository(Users).createQueryBuilder()
            .select('*')
            .orderBy('id')
            .execute()

            let existingUsers = userList.map((item: {id: Number, username: String, password: String}) => {
               return item.username
            })

            if (existingUsers.includes(user.username)) {
               res.json({
                  statuscode: 400,
                  message: 'This username already exists!'
               })
            } else {
               try {
                  await connection.getRepository(Users).save(user);
                  res.json(user);
               } catch (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Internal Server Error' });
               }
            }
         })
      resolve({
         statuscode: 200
      })
   })
};

export const login = async (req: Request, res: Response) => {
   let userCheck: any;
   let userId: number;

   const AppDataSource = new DataSource({
      // type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "expense_tracker",
      // password: "expense-tracker",
      // database: "expense_tracker",
      // entities: [Expense, Users],
      // synchronize: true,
      // logging: false,
      type: "postgres",
      host: "roundhouse.proxy.rlwy.net",
      port: 21769,
      username: "postgres",
      password: "G13dd1fBf-bebb4Fd-1B*-GFf4aBCa2g",
      database: "railway",
      entities: [Expense, Users],
      synchronize: true,
      logging: false,
      })
      await AppDataSource.initialize()
      .then(async (connection: any) => {
         const users = await connection.getRepository(Users).createQueryBuilder()
         .select('*')
         .orderBy('id')
         .execute()

         users.forEach((el: Users)=> {
            if (el.username == req.body.username && el.password == req.body.password) {
               userCheck = true;
               userId = el.id;
            } else {
               return;
            }
         })

         if (userCheck == true) {
            res.json({
               result: true,
               id: userId
            })
         } else {
            res.json({
               result: false
            })
         }
      })
};
