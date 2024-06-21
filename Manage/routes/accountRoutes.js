import express from 'express';
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from '../controllers/accountController.js';

const router = express.Router();

router.post('/accounts', createAccount);
router.get('/accounts', getAccounts);
router.get('/accounts/:id', getAccountById);
router.put('/accounts/:id', updateAccount);
router.delete('/accounts/:id', deleteAccount);

export default router;
