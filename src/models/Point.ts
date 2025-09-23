import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { User } from "./Users"
import { RewardUsed } from "./RewardUsed";

export class Points extends Model {
  declare pointid: number;
  declare userid: number;
  declare reward_used_id?: number;
  declare score: number;
  declare status?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by?: string;
}

Points.init(
  {
    pointid: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    userid: { type: DataTypes.INTEGER, allowNull: false },
    reward_used_id: { type: DataTypes.INTEGER, allowNull: true },
    score: { type: DataTypes.INTEGER, allowNull: false },
    status: DataTypes.STRING,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_by: DataTypes.STRING,
  },
  { sequelize, tableName: "points", modelName: "Points", timestamps: false,    defaultScope: {
      order: [["created_at", "DESC"]]
    } }
);

Points.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Points, { foreignKey: "userid" });

Points.belongsTo(RewardUsed, { foreignKey: "reward_used_id" });
RewardUsed.hasMany(Points, { foreignKey: "reward_used_id" });
