import { Response, Request } from "express";
import { IEventCalendar } from "./types/eventTypes";
import { Emodel } from "../models/EventModel";
export const getEvents = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const events = await Emodel.find().populate("user", "name");
    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener los eventos",
    });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { uid, title, notes, start, end, user } = req.body as IEventCalendar;

  try {
    const newEvent = new Emodel({ title, notes, start, end, user });
    newEvent.user = uid!;
    await newEvent.save();

    return res.status(200).json({
      ok: true,
      newEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al guardar el evento",
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventID = req.params.id;
  const { uid } = req.body as IEventCalendar;
  try {
    const event = await Emodel.findById(eventID);
    // * check if event exist
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un evento con ese ID",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };
    // * update event
    const eventUpdated = await Emodel.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      eventUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar el evento",
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventID = req.params.id;
  const { uid } = req.body as IEventCalendar;
  try {
    const event = await Emodel.findById(eventID);
    // * check if event exist
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un evento con ese ID",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    }
    // * delete event
    await Emodel.findByIdAndDelete(eventID);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al eliminar el evento",
    });
  }
};
