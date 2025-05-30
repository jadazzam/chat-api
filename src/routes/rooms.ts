import express, {Request, Response} from "express";
import RoomsController from "../controllers/rooms";
import {RequestWithUserType} from "../types/requests";
import {UserRequestType} from "../types/users";

const router = express.Router()

interface RoomsPostRequestType extends RequestWithUserType {
    body: {
        name: string
    }
}

router.get("/", async (req: Request, res: Response) => {
    try {
        const user: UserRequestType = (req as RoomsPostRequestType).user
        const ctrl = new RoomsController(user)
        const rooms = await ctrl.findAll()
        res.status(200).json(rooms)
    } catch (e) {
        console.error("Error Rooms GET /rooms", e)
        res.status(500).json({message: `Error Rooms GET /rooms ${e}`})
    }
})

router.get("/mine", async (req: Request, res: Response) => {
    try {
        const user: UserRequestType = (req as RoomsPostRequestType).user
        const ctrl = new RoomsController(user)
        const rooms = await ctrl.findByParam("owner_id", user.id)
        res.status(200).json(rooms)
    } catch (e) {
        console.error("Error Rooms GET mine", e)
        res.status(500).json({message: `Error Rooms GET mine ${e}`})
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user: UserRequestType = (req as RoomsPostRequestType).user
        const ctrl = new RoomsController(user)
        const {id} = req.params
        const {complete} = req.query
        const room = await ctrl.findByParam("id", id, complete === "true")
        res.status(200).json(room)
    } catch (e) {
        console.error("Error Rooms GET", e)
        res.status(500).json({message: `Error route /rooms POST ${e}`})
    }
})


router.post("/", async (req: Request, res: Response) => {
    try {
        const user: UserRequestType = (req as RoomsPostRequestType).user
        const {name} = (req as RoomsPostRequestType).body;
        const ctrl = new RoomsController(user)
        const room = await ctrl.create({
            name
        })
        res.status(200).json(room)
    } catch (e) {
        console.error("Error Rooms POST", e)
        res.status(500).json({message: `Error route /rooms POST ${e}`})
    }
})
export default router