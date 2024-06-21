import { Sequelize } from 'sequelize';


// Ma'lumotlar bazasi konfiguratsiyasi bilan Sequelize-ni ishga tushirishimiz uchun quyidagi code - lar zaruru bo'ladi
export const sequelize = new Sequelize('manage', 'postgres', 'mansur890', {
  host: 'localhost',
  dialect: 'postgres',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync();  
    console.log('Database synchronized...');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


export default sequelize;