import { Request, Response } from "express";
import { createPoint, getAllPointUser, getPointById } from "../services/point.service";

export const createPointController = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const newPoint = await createPoint(payload)

        return res.status(201).json({
            message: "Created Point successfully!",
            data: newPoint
        })

    } catch (error: any) {
        console.error("Error in createPointController", error)
        return res.status(500).json({ message: error.message })
    }
}

export const getPointByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const getid = await getPointById(id)
        return res.status(200).json(getid)
    } catch (error: any) {
        console.error("Error in getPointByIdController", error)
        return res.status(500).json({ message: error.message })
    }
}

export const getAllPointController = async (req: Request, res: Response) => {
    try {
        const result = await getAllPointUser()
        return res.status(200).json(result)
    } catch (error: any) {
        console.error("Error in getAllPointUserController", error)
        return res.status(500).json({ message: error.message })
    }
}