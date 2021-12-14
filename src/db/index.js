import { Sequelize } from "sequelize";

const { DB_URL } = process.env;
const sequelize = new Sequelize(DB_URL);

export const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB is authenticated");
  } catch (error) {
    console.log("Failed to authenticate DB ", error);
  }
};

export const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log("DB is synced");
  } catch (error) {
    console.log("Failed to sync DB", error);
  }
};

export default sequelize;
