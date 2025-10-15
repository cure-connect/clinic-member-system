import { QueryTypes } from "sequelize";
import sequelize from "../database/db";
import { Points } from "../models/Point"
import { PointsHistory } from "../models/PointsHistory"

interface CreateUserPayload {
  userid: number;
  score: number;
  reward_used_id?: number;
  status?: string;
  created_by?: string;
}

interface AddHistoryPayload {
  userid: number;
  points_added: number;
  created_by?: string;
}

//POST Point
export const createOrUpdatePoint = async (payload: CreateUserPayload) => {
  try {
    const existingPoint = await Points.findOne({
      where: { userid: payload.userid },
    });

    let result;

    if (existingPoint) {
      const newScore = (existingPoint.score || 0) + payload.score;

      await existingPoint.update({
        score: newScore,
        reward_used_id: payload.reward_used_id,
        status: payload.status,
        created_by: payload.created_by,
        updated_at: new Date().toISOString(),
      });

      result = existingPoint;

      await addHistoryPoint({
        userid: payload.userid,
        points_added: payload.score,
        created_by: payload.created_by,
      });
    } else {
      const newPoint = await Points.create({
        ...payload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      result = newPoint;

      await addHistoryPoint({
        userid: payload.userid,
        points_added: payload.score,
        created_by: payload.created_by,
      });
    }

    return result;
  } catch (error) {
    console.error("Error in createOrUpdatePoint", error);
    throw error;
  }
};

export const addHistoryPoint = async (payload: AddHistoryPayload) => {
  try {
    const newHistory = await PointsHistory.create({
      userid: payload.userid,
      points_added: payload.points_added,
      created_by: payload.created_by || "system",
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newHistory
  } catch (error: any) {
    console.error("Error in addHistoryPoint:", error);
    return {
      success: false,
      message: "ไม่สามารถเพิ่มประวัติแต้มได้",
      error: error.message,
    };
  }
};

export const getPointById = async (id: number) => {
  try {
    const result = await Points.findByPk(id)
    return result
  } catch (error) {
    console.error("Error in getPointById", error)
    throw error
  }
}

export const getHistoryPoint = async () => {
  try {
    const result = await sequelize.query(`SELECT 
    u.userid AS userid,
    u.firstname AS firstname,
    u.lastname AS lastname,
    CONCAT('+', ph.points_added) AS points,
    ph.created_at AS created_at,
    ph.created_by AS created_by,
    NULL AS title,
    NULL AS description,
    NULL AS start_date,
    NULL AS end_date
FROM point_history ph
LEFT JOIN users u ON u.userid = ph.userid

UNION ALL

SELECT
    u.userid AS userid,
    u.firstname AS firstname,
    u.lastname AS lastname,
    CONCAT('-', ru.points_used) AS points,
    ru.created_at AS created_at,
    ru.created_by AS created_by,
    r.title AS title,
    r.description AS description,
    r.start_date AS start_date,
    r.end_date AS end_date
FROM reward_used ru
LEFT JOIN rewards r ON r.rewardid = ru.rewardid
LEFT JOIN users u ON u.userid = ru.userid

WHERE u.role = 'user'

ORDER BY created_at DESC;`,
      { type: QueryTypes.SELECT}
    );
      return result
  } catch (error) {
    console.error("Error in getHistoryPoint", error)
    throw error
  }
}

export const getAllPointUser = async () => {
  try {
    const result = await Points.findAll({})
    console.log('result', result)
    return result
  } catch (error) {
    console.error("Error in getAllPoint", error)
    throw error
  }
}

export const deletePoints = async (userid: number, points: number) => {

  const userPoints = await Points.findOne({
    where: { userid, status: "active" },
  });

  if (!userPoints) {
    throw new Error("User points not found");
  }

  const currentScore = userPoints.score ?? 0;
  if (currentScore < points) {
    throw new Error("Not enough points");
  }

  userPoints.score = currentScore - points;
  await userPoints.save();

  return userPoints.score;
};