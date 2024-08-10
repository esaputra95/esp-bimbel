import { StudentInterface } from "../master/studentInterface";
import { TutorInterface } from "../master/tutorInterface";
import { StudentRegisterInterface } from "../registers/studentInterface";
import { scheduleDetailInterface } from "../schedule/sessionDetailInterface";
import { SessionInterface } from "../schedule/sessionInterface";

export interface RecordMateriDashboardInterface extends SessionInterface {
    students: {
        id:string;
        name:string;
        phone:string;
    };
    tutor?: TutorInterface;
    studyGroupName: string
}

export interface StudentWillFinishInterface extends scheduleDetailInterface {
    students: StudentRegisterInterface
}

export interface StudyGroupDashboardInterface extends StudentInterface {}