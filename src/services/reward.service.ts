import { Reward } from "../models/Reward"

//POST Reward
export const createReward = async (
    title: string,
    description: string,
    point_require: number,
    limit_per_user: string,
    start_date: Date,
    end_date: Date,
    status_campaign: string,
    created_by: string
) => {
    try {
        const newReward = await Reward.create({
            title,
            description,
            point_require,
            limit_per_user,
            start_date,
            end_date,
            status_campaign,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by
        })

        return newReward
    } catch (error) {
        console.error("Error in createReward", error)
        throw error
    }
}