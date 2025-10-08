import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import bcrypt from "bcrypt";

export class User extends Model {
  declare userid: number;
  declare username: string | null;
  declare password: string | null;
  declare title: string;
  declare firstname: string;
  declare lastname: string;
  declare mobile_no: string;
  declare role: string;
  declare qrcode: string | null;
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by: string;
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
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
    defaultScope: {
      order: [['created_at', 'DESC']],
    },
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password && user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    },
  }
);
