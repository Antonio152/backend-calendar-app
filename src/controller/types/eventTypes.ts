import { Schema } from "mongoose";
export interface IEventCalendar {
    uid?: Schema.Types.ObjectId | string | any;
    title: string;
    start: Date;
    end: Date;
    notes?: string;
    user?: {
        _id: string;
        name: string;
    };
}