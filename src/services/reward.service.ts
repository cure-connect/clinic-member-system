import { Reward } from "../models/Reward"

interface CreateUserPayload {
    username: string;
    password: string;
    title?: string;
    firstname: string;
    lastname: string;
    mobile_no?: string;
    role?: string;
    created_by?: string;
}

//POST Reward
export const createReward = async (payload: CreateUserPayload) => {
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

export const deleteReward = async (id: number) => {
    try {
        const deleteReward = await Reward.destroy({ where: { rewardid: id }})
        return deleteReward
    } catch (error) {
        console.error("Error in deleteReward", error)
        throw error
    }
}