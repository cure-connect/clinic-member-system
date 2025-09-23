import { RewardUsed } from "../models/RewardUsed"

interface CreateRewardPayload {
    reward_used_id: string,
    rewardid: string,
    userid: string,
    created_by: string
}

//POST RewardUsed
export const createRewardUsed = async (payload: CreateRewardPayload) => {
    try {
        const newReward = await RewardUsed.create({
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