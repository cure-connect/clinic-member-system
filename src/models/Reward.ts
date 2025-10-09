import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

export class Reward extends Model {
  declare rewardid: string;
  declare title: string;
  declare description?: string;
  declare point_require: number;
  declare limit_per_user?: number;
  declare start_date?: Date;
  declare end_date?: Date;
  declare status_campaign?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by?: string;
}

Reward.init(
  {
    rewardid: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    point_require: { type: DataTypes.INTEGER, allowNull: false },
    limit_per_user: DataTypes.INTEGER,
    start_date: { type: DataTypes.DATE, allowNull: true },
    end_date: { type: DataTypes.DATE, allowNull: true },
    status_campaign: {
      type: DataTypes.ENUM("active", "expired", "coming_soon"),
      defaultValue: "coming_soon",
      allowNull: false,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_by: DataTypes.STRING,
  },
  { sequelize, tableName: "rewards", modelName: "Reward", timestamps: false }
);
