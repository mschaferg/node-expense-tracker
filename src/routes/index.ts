import { Router } from 'express';
import { 
    getExpenses,
    addExpense,
    deleteExpense,
    getExpenseById,
    updateExpense,
    addNewUser,
    login } from '../controllers/expenseController';

const router = Router();

router.post('/userExpenses', getExpenses);
router.post('/expenses', addExpense);
router.post('/delete', deleteExpense);
router.post('/expenseById', getExpenseById);
router.post('/update', updateExpense);
router.post('/createUser', addNewUser);
router.post('/users', login);

export default router;