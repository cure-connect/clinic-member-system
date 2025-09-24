import { Reward } from "../models/Reward"

interface CreateRewardPayload {
    title: string,
    description: string
    point_require: number,
    limit_per_user: number,
    start_date: Date,
    end_date: Date,
    status_campaign: string,
    created_by: string
}

//POST Reward
export const createReward = async (payload: CreateRewardPayload) => {
    try {
        const newReward = await Reward.create({
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

//GET All Rewards
export const getAllReward = async () => {
    try {
        const result = await Reward.findAll({})
        return result
    } catch (error) {
        console.error("Error in getAllReward", error)
        throw error
    }
}

export const getRewardById = async (id: number) => {
    try {
        const result = await Reward.findByPk(id)
        return result
    } catch (error) {
        console.error("Error in getRewardById", error)
        throw error
    }
}

export const updatedReward = async (
    rewardid: number,
    payload: {
        description: string,
        point_require: number,
        limit_per_user: number,
        start_date: Date,
        end_date: Date,
        status_campaign: string
    }
) => {
    const reward = await Reward.findByPk(rewardid);
    if (!reward) {
        throw new Error("Reward not found");
    }

    await reward.update({
        ...payload,
        updated_at: new Date(),
    });

    return reward;
};

export const deleteReward = async (id: number) => {
    try {
        const deleteReward = await Reward.destroy({ where: { rewardid: id } })
        return deleteReward
    } catch (error) {
        console.error("Error in deleteReward", error)
        throw error
    }
}