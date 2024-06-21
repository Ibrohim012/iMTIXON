import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api', accountRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

connectDB();

export default app;
