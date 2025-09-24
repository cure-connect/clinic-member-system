import { Points } from "../models/Point"

interface CreateUserPayload {
    pointid: number,
    userid: number,
    reward_used_id: number,
    score: number,
    status: string,
    created_by: string
}

//POST Point
export const createPoint = async (payload: CreateUserPayload) => {
    try {
        const newReward = await Points.create({
            ...payload,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })

        return newReward

    } catch (error) {
        console.error("Error in createReward", error)
        throw error
    }
}

export const getPointById = async (id: number) => {
    try {
        const result = await Points.findByPk(id)
        return result
    } catch (error) {
        console.error("Error in getPointById", error)
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