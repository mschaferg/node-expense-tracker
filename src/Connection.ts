import { DataSource } from 'typeorm';
import { Expense } from './entities/Expense'

export class Connection {
    connection = async () => {
    try {
        const client = new DataSource({
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
        await client.initialize();
    } catch (error) {
        console.log(error)
    }
}
}