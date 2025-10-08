import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { User } from "./Users";
import { Reward } from "./Reward";

export class RewardUsed extends Model {
  declare reward_used_id: number;
  declare rewardid: string;
  declare userid: string;
  declare points_used: number;
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by?: string;
}

RewardUsed.init(
  {
    reward_used_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rewardid: { type: DataTypes.INTEGER, allowNull: false },
    userid: { type: DataTypes.INTEGER, allowNull: false },
    points_used: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_by: DataTypes.STRING,
  },
  { sequelize, tableName: "reward_used", modelName: "RewardUsed", timestamps: false }
);

RewardUsed.belongsTo(User, { foreignKey: "userid" });
RewardUsed.belongsTo(Reward, { foreignKey: "rewardid" });
User.hasMany(RewardUsed, { foreignKey: "userid" });
Reward.hasMany(RewardUsed, { foreignKey: "rewardid" });
