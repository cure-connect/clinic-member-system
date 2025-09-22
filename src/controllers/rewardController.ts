import { Request, Response } from "express";
import { createReward } from '../services/reward.service'

export const createRewardController = async (req: Request, res: Response) => {
    try {
        const { title, description, point_require, limit_per_user, start_date, end_date, status_campaign, created_by } = req.body

        const newReward = await createReward(title, description, point_require, limit_per_user, start_date, end_date, status_campaign, created_by)
        return res.status(201).json({
            message: 'created reward successfully!',
            data: newReward
        })
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}