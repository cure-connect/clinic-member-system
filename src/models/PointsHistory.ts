import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import { User } from "./Users";

export class PointsHistory extends Model {
  declare point_history_id: number;
  declare userid: number;
  declare points_added: number;
  declare created_at: Date;
  declare updated_at: Date;
  declare created_by?: string;
}

PointsHistory.init(
  {
    point_history_id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    userid: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    points_added: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    created_at: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW 
    },
    updated_at: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW 
    },
    created_by: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
  },
  { 
    sequelize, 
    tableName: "point_history", 
    modelName: "PointHistory", 
    timestamps: false 
  }
);

PointsHistory.belongsTo(User, { foreignKey: "userid" });
User.hasMany(PointsHistory, { foreignKey: "userid" });
