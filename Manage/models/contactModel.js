import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Customer from './customerModel.js';  


// Kontakt rejimi va qanday xususiyat va ma'lumotlarni o'z ichiga olishini ko'rsatib o'tamiz
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('email', 'phone', 'address'),
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Customer.hasMany(Contact, { foreignKey: 'customerId' });
//Bu qator Customer va Contact modellar o'rtasida 1-to-many (bir ko'pga) munosabatini o'rnatadi. 
//Ya'ni, har bir Customer (mijoz) ko'plab Contact (kontakt) larni o'z ichiga olishi mumkinligini bildiradi.

Contact.belongsTo(Customer, { foreignKey: 'customerId' });
/*
Bu qator Contact va Customer modellar o'rtasida many-to-1 (ko'pdan birga) munosabatini o'rnatadi. 
Ya'ni, har bir Contact faqat bitta Customer ga tegishli bo'lishi mumkinligini bildiradi.
*/

export default Contact;
