import { Request, Response } from "express";
import { getAllReward ,createReward, getRewardById, deleteReward } from '../services/reward.service'

export const createRewardController = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const newReward = await createReward(payload);

        return res.status(201).json({
            message: "Created reward successfully!",
            data: newReward,
        });
    } catch (error: any) {
        console.error("Error in createRewardController", error);
        return res.status(500).json({ message: error.message });
    }
}

export const getAllRewardController = async (req: Request, res: Response) => {
    try {
        const result = await getAllReward()
        return res.status(200).json(result);
    } catch (error: any) {
        console.error("Error in getAllRewardController", error);
        return res.status(500).json({ message: error.message });
    }
}

export const getRewardByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await getRewardById(id)
        return res.status(200).json(result)
    } catch (error: any) {
        console.error("Error in getRewardByIdController", error);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteRewardController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await deleteReward(id)
        return res.status(200).json(result)
    } catch (error: any) {
        console.error("Error in deleteRewardController", error);
        return res.status(500).json({ message: error.message });   
    }
}