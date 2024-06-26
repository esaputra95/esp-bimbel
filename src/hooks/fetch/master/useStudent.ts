import { useState } from "react";
import { OptionSelectInterface } from "../../../interfaces/globalInterface";
import url from "../../../services/url";
import { getDataSelect } from "../../models/master/studentModel";
import { OptionDummy } from "../../../utils/dummy/setting";

export const useStudent = () => {
    const [ dataOptionStudent, setDataOptionStudent ] = useState<OptionSelectInterface[]>([OptionDummy])
    const [ dataOptionStudentAll, setDataOptionStudentAll ] = useState<OptionSelectInterface[]>([OptionDummy])
    const { Student } = url
    
    const optionStudent = async (data: string): Promise<OptionSelectInterface[]> => {
        const response= await getDataSelect(Student.getSelect, {name: data});
        setDataOptionStudent(response)
        return response
    }

    const optionStudentAll = async (data: string): Promise<OptionSelectInterface[]> => {
        const response= await getDataSelect(Student.getSelectAll, {name: data});
        setDataOptionStudentAll(response)
        return response
    }

    return{
        optionStudent,
        dataOptionStudent,
        optionStudentAll,
        dataOptionStudentAll
    }
}