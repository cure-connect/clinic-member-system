import { Request, Response } from "express";
import { Points } from "../models/Point";
import { RewardUsed } from "../models/RewardUsed";
import { Reward } from "../models/Reward";
import { getHistoryReward } from "../services/rewardUsed.service";

// export const createRewardUsedController = async (req: Request, res: Response) => {
//     try {
//         console.log('sss', req.body)
//         const { rewardid, userid, created_by } = req.body;

//         const reward = await Reward.findByPk(rewardid);
//         if (!reward) {
//             return res.status(404).json({ message: "Reward not found" });
//         }

//         if ((reward.limit_per_user ?? 0) <= 0) {
//             return res.status(400).json({ message: "Reward usage limit reached" });
//         }

//         const pointsToUse = reward.point_require ?? 0;

//         const userPoints = await Points.findOne({
//             where: { userid, status: "active" },
//         });
//         if (!userPoints) {
//             return res.status(404).json({ message: "User points not found" });
//         }

//         const currentScore = userPoints.score ?? 0;
//         if (currentScore < pointsToUse) {
//             return res.status(400).json({ message: "Not enough points" });
//         }

//         const newRewardUsed = await RewardUsed.create({
//             rewardid,
//             userid,
//             created_by,
//             points_used: pointsToUse
//         });

//         userPoints.score = currentScore - pointsToUse;
//         await userPoints.save();

//         if ((reward.limit_per_user ?? 0) <= 0) {
//             return res.status(400).json({ message: "Reward usage limit reached" });
//         }

//         reward.limit_per_user = (reward.limit_per_user ?? 0) - 1;
//         await reward.save();

//         return res.status(201).json({
//             message: "Reward used successfully!",
//             data: newRewardUsed,
//             points_left: userPoints.score,
//             reward_limit_left: reward.limit_per_user,
//         });
//     } catch (err: any) {
//         console.error("Error in createRewardUsedController", err);
//         return res.status(500).json({ message: err.message });
//     }
// };

export const getHistoryRewardController = async (req: Request, res: Response) => {
    try {
        const result = await getHistoryReward();
        return res.status(200).json(result)
    } catch (err: any) {
        console.error("Error in getHistoryRewardController", err);
        return res.status(500).json({ message: err.message }); 
    }
}

export const createRewardUsedController = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body)
        const { rewardid, userid, created_by } = req.body;

        const reward = await Reward.findByPk(rewardid);
        if (!reward) {
            return res.status(404).json({ message: "Reward not found" });
        }

        const pointsToUse = reward.point_require ?? 0;

        const userPoints = await Points.findOne({
            where: { userid, status: "active" },
        });
        if (!userPoints) {
            return res.status(404).json({ message: "User points not found" });
        }

        if ((userPoints.score ?? 0) < pointsToUse) {
            return res.status(400).json({ message: "Not enough points" });
        }

        const newRewardUsed = await RewardUsed.create({
            rewardid,
            userid,
            created_by,
            points_used: pointsToUse
        });

        userPoints.score -= pointsToUse;
        await userPoints.save();

        if (reward.limit_per_user && reward.limit_per_user > 0) {
            reward.limit_per_user -= 1;
            await reward.save();
        }

        return res.status(201).json({
            message: "Reward used successfully!",
            data: newRewardUsed,
            points_left: userPoints.score,
            reward_limit_left: reward.limit_per_user,
        });
    } catch (err: any) {
        console.error("Error in createRewardUsedController", err);
        return res.status(500).json({ message: err.message });
    }
};
