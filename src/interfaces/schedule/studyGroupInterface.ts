import { 
    Control,
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { ApiResponse, InfoResponse } from "../apiInfoInterface";
import { OptionSelectInterface } from "../globalInterface";
import { StudyGroupDetailInterface } from "./studyGroupDetailInterface";
import { ClassMasterInterface } from "../master/classMasterInterface";
import { GuidanceTypeInterface } from "../settings/guidanceTypeInterface";
import { SingleValue } from "react-select";

export interface StudyGroupInterface {
    id?: string
    name: string
    classId: string
    class?: OptionSelectInterface
    classMaster?: ClassMasterInterface
    guidanceTypeId: string
    guidanceType?: OptionSelectInterface
    total: number
    userCreate?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
    deletedAt?: Date | null
}

export interface StudentGroupQueryInterface {
    name?: string
}

export interface StudyGroupInputForm {
    studyGroup: StudyGroupInterface,
    studyGroupDetails: StudyGroupDetailInterface[]
}

export type StudyGroupFormProps = {
	handleSubmit: UseFormHandleSubmit<StudyGroupInputForm>
	onSubmit: (data:StudyGroupInputForm) => void;
	register: UseFormRegister<StudyGroupInputForm>;
    onCancel: () => void;
    errors: FieldErrors<StudyGroupInputForm>;
    isLoading?: boolean;
    idDetail?: string | null;
    control: Control<StudyGroupInputForm>;
    optionGuidanceType: (data: string) => Promise<OptionSelectInterface[]>
    dataOptionGuidanceType: OptionSelectInterface[];
    fields: FieldArrayWithId<StudyGroupInputForm, "studyGroupDetails", "id">[]
    optionStudent: (data: string) => Promise<OptionSelectInterface[]>
    dataOptionStudent: OptionSelectInterface[];
    append: UseFieldArrayAppend<StudyGroupInputForm, "studyGroupDetails">
    remove: UseFieldArrayRemove,
    optionClassMaster: (data: string) => Promise<OptionSelectInterface[]>
    dataOptionClassMaster: OptionSelectInterface[];
    setValue: UseFormSetValue<StudyGroupInputForm>;
    getValues: UseFormGetValues<StudyGroupInputForm>;
    updateStatus: boolean,
    onChangeStudyGroup: (key: 'classId' | 'guidanceTypeId', event: SingleValue<OptionSelectInterface>) => void
    onChangeStudyGroupDetail: (key: 'studentId', index:number, event: SingleValue<OptionSelectInterface>) => void
}

export interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface StudyGroupTableInterface extends Omit<StudyGroupInterface, 'classType' | 'classTypeId'> {
    classMaster: ClassMasterInterface;
    guidanceTypes: GuidanceTypeInterface;
    schedules: []
}

export interface ApiResponseStudyGroup extends ApiResponse {
    data: {
        info: InfoResponse,
        studyGroup: StudyGroupTableInterface[]
    }
}

export interface ApiResponseUpdateStudyGroup extends ApiResponse {
    status: boolean,
    message: string;
    data: StudyGroupInputForm
}