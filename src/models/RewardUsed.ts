import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { User } from "./Users";
import { Reward } from "./Reward";

export class RewardUsed extends Model {
  declare reward_used_id: string;
  declare rewardid: string;
  declare userid: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by?: string;
}

RewardUsed.init(
  {
    reward_used_id: { type: DataTypes.STRING, primaryKey: true },
    rewardid: { type: DataTypes.STRING, allowNull: false },
    userid: { type: DataTypes.STRING, allowNull: false },
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
