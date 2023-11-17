import { Router } from 'express';
import { 
    getExpenses,
    addExpense,
    deleteExpense,
    getExpenseById,
    updateExpense } from '../controllers/expenseController';

const router = Router();

router.get('/expenses', getExpenses);
router.post('/expenses', addExpense);
router.post('/delete', deleteExpense);
router.post('/expenseById', getExpenseById);
router.post('/update', updateExpense);

export default router;