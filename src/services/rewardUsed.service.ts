import { QueryTypes } from "sequelize"
import sequelize from "../database/db"
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
        console.error("Error in createRewardUsed", error)
        throw error
    }
}

export const getHistoryReward = async () => {
    try {
        const result = await sequelize.query(`
            select
	            ru.reward_used_id as reward_used_id,
	            u.firstname as firstname,
	            u.lastname as lastname,
	            r.title as title,
	            r.description as description,
                ru.points_used as points_to_used,
	            r.start_date as start_date,
	            r.end_date as end_date
            from reward_used ru 
            left join rewards r on r.rewardid = ru.rewardid 
            left join users u on u.userid = ru.userid
            where u.role = 'user'
            `,
            { type: QueryTypes.SELECT }
        )

        return result
    } catch (error) {
        console.error("Error in getHistoryReward", error)
        throw error
    }
}