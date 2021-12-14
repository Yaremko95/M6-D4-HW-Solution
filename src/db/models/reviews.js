import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Review = sequelize.define("reviews", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Review;
