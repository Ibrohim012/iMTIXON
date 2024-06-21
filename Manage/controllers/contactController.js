import Contact from '../models/contactModel.js';
import Customer from '../models/customerModel.js';


export const createContact = async (req, res) => {
    const { customerId, type, details } = req.body;
  
    try {
      const customer = await Customer.findByPk(customerId);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      const newContact = await Contact.create({
        customerId,
        type,
        details,
      });
  
      res.status(201).json({
        message: 'Contact created successfully',
        contact: newContact,
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ message: 'Failed to create contact' });
    }
  };

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

// ID bo'yicha bitta kontaktni olish uchun quyidagicha funksiya yozib olamiz
export const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ message: 'Failed to fetch contact' });
  }
};

export const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { customerId, type, details } = req.body;

  try {
    let contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact = await contact.update({
      customerId,
      type,
      details,
    });

    res.status(200).json({
      message: 'Contact updated successfully',
      contact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Failed to update contact' });
  }
};

export const deleteContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.destroy();

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
};
