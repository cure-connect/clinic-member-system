import { Request, Response } from "express";
import { createOrUpdatePoint, deletePoints, getAllPointUser, getPointById } from "../services/point.service";

export const createPointController = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const newPoint = await createOrUpdatePoint(payload)

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
        const id = parseInt(req.params.id)
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

export const deletePointsController = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id)
    const point = req.body.points

    if (!userid || typeof point !== "number" || point <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const pointsLeft = await deletePoints(userid, point);

    return res.status(200).json({
      message: "Points deleted successfully",
      points_left: pointsLeft,
    });
  } catch (err: any) {
    console.error("Error in deductPointsController", err);
    return res.status(500).json({ message: err.message });
  }
};