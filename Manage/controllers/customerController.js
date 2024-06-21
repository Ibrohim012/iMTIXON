import Customer from '../models/customerModel.js';

export const createCustomer = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, status } = req.body;

  try {
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      status,
    });

    res.status(201).json({
      message: 'Customer created successfully',
      customer: newCustomer,
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Failed to create customer' });
  }
};

// Barcha mijozlarni olish uchun funksiya
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};

// ID bo'yicha bitta mijozni olish uchun  funktsiyasi
export const getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
};

// Controller function to update a customer by ID
export const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, address, status } = req.body;

  try {
    let customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer = await customer.update({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      status,
    });

    res.status(200).json({
      message: 'Customer updated successfully',
      customer,
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Failed to update customer' });
  }
};

// Controller function to delete a customer by ID
export const deleteCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Failed to delete customer' });
  }
};
