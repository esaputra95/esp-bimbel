import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { StudentInterface } from "../master/studentInterface";
import { PackageInterface } from "../settings/packageInterface";
import { SessionInterface } from "../settings/sessionInterface";
import { SchoolYearInterface } from "../settings/schoolYearInterface";
import { GuidanceTypeInterface } from "../settings/guidanceTypeInterface";

export interface RegistrationInterface {
    id?: string
    studentId: string;
    student?: OptionSelectInterface;
    students?: StudentInterface;
    packages?: PackageInterface;
    sessions?: SessionInterface;
    classId: string;
    class?: OptionSelectInterface
    university: string;
    amount?: number;
    sessionId: string;
    session?: OptionSelectInterface;
    packageId: string;
    package?: OptionSelectInterface;
    guidanceTypeId: string;
    guidanceType?: OptionSelectInterface;
    guidanceTypes?: GuidanceTypeInterface;
    location: string;
    schoolYearId: string;
    schoolYear?: OptionSelectInterface;
    schoolYears?: SchoolYearInterface;
    status?: number;
    isModule?: number | null
    userCreate?: string;
    createdAt?: string
    updatedAt?: string
    deletedAt?: string
}


export interface RegistrationSearchInterface {
    name?: string;
    code?: string
}

export type RegistrationFormProps = {
	handleSubmit: UseFormHandleSubmit<RegistrationInterface>
	onSubmit: (data:RegistrationInterface) => void;
	register: UseFormRegister<RegistrationInterface>;
    onCancel: () => void;
    errors: FieldErrors<RegistrationInterface>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<RegistrationInterface>;
    optionClassMaster: (data: string) => Promise<OptionSelectInterface[]>;
    optionStudent: (data: string) => Promise<OptionSelectInterface[]>;
    optionSession: (data: string) => Promise<OptionSelectInterface[]>;
    optionPackage: (data: string) => Promise<OptionSelectInterface[]>;
    optionGuidanceType: (data: string) => Promise<OptionSelectInterface[]>;
    optionSchoolYear: (data: string) => Promise<OptionSelectInterface[]>;
    handleOnChangeSelect: (key: keyof RegistrationInterface, data: string) => void
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface RegistrationTableInterface extends RegistrationInterface {
    classTypes: RegistrationInterface
}

export interface ApiResponseRegistration extends ApiResponse {
    data: {
        info: InfoResponse,
        register: RegistrationTableInterface[]
    }
}

export interface ApiResponseUpdateRegistration extends ApiResponse {
    data: {
        info: InfoResponse,
        register: RegistrationInterface
    }
}