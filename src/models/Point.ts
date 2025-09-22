import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { User } from "./Users"
import { RewardUsed } from "./RewardUsed";

export class Points extends Model {
  declare pointid: string;
  declare userid: string;
  declare reward_used_id?: string;
  declare score: number;
  declare status?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by?: string;
}

Points.init(
  {
    pointid: { type: DataTypes.STRING, primaryKey: true },
    userid: { type: DataTypes.STRING, allowNull: false },
    reward_used_id: { type: DataTypes.STRING },
    score: { type: DataTypes.INTEGER, allowNull: false },
    status: DataTypes.STRING,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_by: DataTypes.STRING,
  },
  { sequelize, tableName: "points", modelName: "Points", timestamps: false }
);

Points.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Points, { foreignKey: "userid" });

Points.belongsTo(RewardUsed, { foreignKey: "reward_used_id" });
RewardUsed.hasMany(Points, { foreignKey: "reward_used_id" });
