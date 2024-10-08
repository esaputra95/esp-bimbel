import { MyEnum } from "../../schema/publics/registerSchema";

export interface StudentInterface {
    id?: string;
    name: string;
    studyProgram: string;
    phone: string;
    school: string;
    placeBirth: string;
    dateBirth: string;
    address: string;
    gender: MyEnum,
    classGrade: string;
    university: string;
    statusStudy?: 'pelajar' | 'alumni';
    country: string;
    province: string;
    city: string;
    parentName: string;
    parentPhone: string;
    isModule?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageUpload?: any;
    agreement: number;
    email: string;
}