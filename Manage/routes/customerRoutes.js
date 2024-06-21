import express from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from '../controllers/customerController.js';

const router = express.Router();

router.post('/', createCustomer);

router.get('/', getAllCustomers);

router.get('/:id', getCustomerById);

router.put('/:id', updateCustomerById);

router.delete('/:id', deleteCustomerById);

export default router;
