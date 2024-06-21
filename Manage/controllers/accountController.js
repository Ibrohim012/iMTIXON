import Account from '../models/accountModel.js';
import Customer from '../models/customerModel.js';

export const createAccount = async (req, res) => {
  const { customerId, balance, currency, status } = req.body;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const newAccount = await Account.create({
      customerId,
      balance,
      currency,
      status,
    });

    res.status(201).json({
      message: 'Account created successfully',
      account: newAccount,
    });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Failed to create account' });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Failed to fetch accounts' });
  }
};

export const getAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ message: 'Failed to fetch account' });
  }
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { customerId, balance, currency, status } = req.body;

  try {
    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (customerId) {
      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
    }

    await account.update({
      customerId,
      balance,
      currency,
      status,
    });

    res.status(200).json({
      message: 'Account updated successfully',
      account,
    });
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ message: 'Failed to update account' });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await account.destroy();
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Failed to delete account' });
  }
};


export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
