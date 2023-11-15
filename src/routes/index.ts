import { Router } from 'express';
import { getExpenses, addExpense, deleteExpense } from '../controllers/expenseController';

const router = Router();

router.get('/expenses', getExpenses);
router.post('/expenses', addExpense);
router.post('/delete', deleteExpense)

export default router;