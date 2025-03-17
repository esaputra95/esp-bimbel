import { OptionSelectInterface } from "../globalInterface";
import { RoomInterface } from "../master/roomInterface";
import { SessionTableInterface } from "./sessionInterface";

export interface ClassInformationInterface {
    startDate?: string;
    endDate?: string;
    tutor?: OptionSelectInterface;
    type?: 'online' | 'offline'
}

export interface TableClassInformationInterface {
    status: boolean,
    message: string;
    data: StudyGroup
}

type Room = {
    id:string;
    title:string;
}

export type EventCalender = {
    id:string;
    title: string;
    extendedProps: {
        group: string;
        course: string;
        room: string
    },
    
    start:string;
    end:string;
    resourceId:string
}

export interface StudyGroup {
    room: Room[];
    event: EventCalender[]
}


export interface RoomClassInformation extends RoomInterface {
    schedules: SessionTableInterface[]
}