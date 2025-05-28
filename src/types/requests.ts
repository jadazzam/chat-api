import {Request} from "express";
import {UserRequestType} from "./users";

export interface RequestWithUserType extends Request {
    user: UserRequestType
}