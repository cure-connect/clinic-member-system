import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database/db";
import bcrypt from "bcrypt";

export class User extends Model {
  declare userid: number;
  declare username: string;
  declare password: string;
  declare title: string
  declare firstname: string;
  declare lastname: string;
  declare mobile_no: string;
  declare role: string;
  declare qrcode: string
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by: string
}

User.init(
  {
    userid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    qrcode: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);
