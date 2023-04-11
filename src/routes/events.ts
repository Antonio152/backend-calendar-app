import { Router } from "express";
import { check } from "express-validator";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controller/eventsController";
import { validarJWT } from "../middlewares/validar-jwt";
import { validatefields } from "../middlewares/validateFields";
import { isDate } from "../helpers/isDate";
const router = Router();

// ! ****** Route /api/events
//All routes need JWT validation
router.use(validarJWT);

//Get all events
router.get("/", getEvents);

//Create an event
router.post("/", [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validatefields
], createEvent);

//Update an event
router.put("/:id", updateEvent);

//Delete an event
router.delete("/:id", deleteEvent);

export default router;
