import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} from '../controllers/contactController.js';

const router = express.Router();

// Route to handle POST request to create a new contact
router.post('/', createContact);

// Route to handle GET request to fetch all contacts
router.get('/', getAllContacts);

router.get('/:id', getContactById);

router.put('/:id', updateContactById);

router.delete('/:id', deleteContactById);

export default router;
