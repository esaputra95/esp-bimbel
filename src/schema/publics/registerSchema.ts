import { useTranslation } from "react-i18next";
import * as yup from "yup"

export enum MyEnum {
    LakiLaki = "laki_laki",
    Perempuan = "perempuan"
}

const RegisterSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        studyProgram: yup.string().required(`${t("study-program")} ${t("required")}`),
        phone: yup.string().required(`${t("phone")} ${t("required")}`),
        school: yup.string().required(`${t("school")} ${t("required")}`),
        placeBirth: yup.string().required(`${t("place-birth")} ${t("required")}`),
        dateBirth: yup.string().required(`${t("date-birth")} ${t("required")}`),
        address: yup.string().required(`${t("address")} ${t("required")}`),
        // gender: yup.mixed<MyEnum>().required().oneOf(['laki-laki', 'perempuan']).required(`${t("gender")} ${t("required")}`),
        gender: yup.string().required().oneOf([MyEnum.LakiLaki, MyEnum.Perempuan], 'Invalid gender value'),
        classGrade: yup.string().required(`${t("class-grade")} ${t("required")}`),
        university: yup.string().required(`${t("university")} ${t("required")}`),
        // statusStudy: yup.string().required(`${t("status-study")} ${t("required")}`),
        // statusStudy: yup.mixed().oneOf(['pelajar', 'alumni']).required(`${t("status-study")} ${t("required")}`),
        country: yup.string().required(`${t("country")} ${t("required")}`),
        province: yup.string().required(`${t("province")} ${t("required")}`),
        city: yup.string().required(`${t("city")} ${t("required")}`),
        parentName: yup.string().required(`${t("parent-name")} ${t("required")}`),
        parentPhone: yup.string().required(`${t("parent-phone")} ${t("required")}`),
        // image: yup.string().required(`${t("image")} ${t("required")}`),
        agreement: yup.number().required(`${t("agreement")} ${t("required")}`),
        // packageId: yup.().required(`${t("package")} ${t("required")}`),
        email: yup.string().required(`${t("email")} ${t("required")}`),
        location: yup.string().required(),
        statusStudy: yup.string().oneOf(['pelajar', 'alumni']).optional()
    });

    return {
        schema
    }
}
export default RegisterSchema