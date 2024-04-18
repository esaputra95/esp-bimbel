import { SubmitHandler, useForm } from "react-hook-form";
import { ScheduleReport, ResponseApi } from "../../../interfaces/reports/ScheduleReportInterface";
import moment from "moment";
import { getData } from "../../models/reports/scheduleReportModel";
import url from "../../../services/url";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { t } from "i18next";
import { AxiosError } from "axios";
import { DataMessageError } from "../../../interfaces/apiInfoInterface";
import { handleMessageErrors } from "../../../services/handleErrorMessage";
import { useState } from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import helperReport from "../../../utils/headerReport";
import { getData as getDataSetting}  from "../../models/settings/settingModel"
import { getDataById as getDataStudentById } from "./../../models/registers/studentModel"
import { ApiResponseSetting } from "../../../interfaces/settings/settingInterface";
import { ApiResponseUpdateStudent } from "../../../interfaces/registers/studentInterface";

const useScheduleReport = () => {
    const [ dataScheduleReport, setDataScheduleReport ] = useState<[][]>()
    const { 
        ScheduleReport,
        Setting, 
        Student
    } = url;
    const doc = new jsPDF();
    const {
        reset,
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<ScheduleReport>({
        defaultValues: {
            startDate: moment().startOf('M').format('YYYY-MM-DD'),
            endDate: moment().endOf('M').format('YYYY-MM-DD')
        }
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:ScheduleReport)=> getData(ScheduleReport.get, data),
        onSuccess: (data:ResponseApi) => {
            if(data.status){
                if(getValues('type')==="view"){
                    setDataScheduleReport(data.data)
                }else{
                    toPdf(data.data??[])
                }
                toast.success(t("success-get-data"), {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        onError: async (errors) => {
            const err = errors as AxiosError<DataMessageError>
            let message = `${errors}`
            if(err.response?.status === 400){
                message = await handleMessageErrors(err.response?.data?.errors)
            }
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const toPdf = async (data:string[][]) => {
        const headerData:ApiResponseSetting = await getDataSetting(Setting.get);
        const icon = headerData.data.setting.find(value=> value.label === "icon")
        const hotline = headerData.data.setting.find(value=> value.label === "hotline")
        const address = headerData.data.setting.find(value=> value.label === "address")
        const city = headerData.data.setting.find(value=> value.label === "city")
        const postalCode = headerData.data.setting.find(value=> value.label === "postal-code")
        const website = headerData.data.setting.find(value=> value.label === "website")
        const footNote = headerData.data.setting.find(value=> value.label === "footnote")
        const email = headerData.data.setting.find(value=> value.label === "email")

        doc.addImage(`${import.meta.env.VITE_API_URL}/images/${icon?.value}`, 'JPEG', 12, 2, 25, 25);
        doc.setFontSize(9)
        doc.text([
            'LAPORAN JADWAL ESP SISWA ABC', 
            `Head Office: ${address?.value ?? ''}`,
            `${city?.value ?? ''}, ${postalCode?.value ?? ''}`,
            `hotline : ${hotline?.value ?? ''}`,
            `Website: ${website?.value ?? ''}`,
            `Email: ${email?.value ?? ''}`
        ], 42, 6);

        const hexToRgb = (hex: string) => {
            hex = hex.replace(/^#/, '');
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            // Return as an object
            return { r: r, g: g, b: b };
        };
        let topTableContent=42;
        if(getValues('student')){
            topTableContent+=17
            const student:ApiResponseUpdateStudent = await getDataStudentById(Student.getById, getValues('student.value'));
            const textWidth = 186;
            const height = 23;
            // Draw filled rectangle as background
            const rgb = hexToRgb('#1bbd9d');
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.rect(12, 34, textWidth, height, 'F');
            // Add the text
            doc.setTextColor('white'); // Reset text color to black
            doc.setFontSize(10);
            const packageData = student.data.student.registers?.find(value=> value.status === 1 );
            doc.text([
                `Nama Siswa /Grup Belajar : ${getValues('student.label')}`,
                `${t('major')} : ${student.data.student.studyProgram}`,
                `${t('packages')} : ${packageData?.packages?.name}`,
                `${t('type')} : ${student.data.student.registers?.map(val=>val.guidanceTypes?.name)}`,
                `${t('sessions')} : ${data.length}`
            ], 14, 34 + height-19); // subtract 3 for better alignment
        }
        if(getValues('tentor')){
            topTableContent+=10
            let topTentor=45;
            let topbgTentor=40;
            if(getValues('student')){
                topTentor+=19
                topbgTentor+=19;
            }
            // Draw filled rectangle as background
            const rgb = hexToRgb('#1bbd9d');
            doc.setFillColor(rgb.r, rgb.g, rgb.b);
            doc.rect(12, topbgTentor, 186, 8, 'F');
            // doc.rect(12, 53, 186, 10, 'F');
            // Add the text
            doc.setTextColor('white'); // Reset text color to black
            doc.setFontSize(10);
            // doc.text(`Tentor : ${getValues('tentor.label')}`,14, 60)
            doc.text(`Tentor : ${getValues('tentor.label')}`,14, topTentor)
        }

        let newHead:string[]=[];
        for (const value of helperReport.headerReportSchedule) {
            newHead=[...newHead,
                t(value)
            ]
        }
        autoTable(doc, {
            head: [
                newHead
            ],
            margin: { left:12, right:12, top:topTableContent },
            theme:'grid',
            styles:{halign:'center'},
            body: data??'',
        })
        doc.setFontSize(9)
        doc.text(footNote?.value ?? '' , 12,285)
        doc.save('Laporan Jadwal Siswa.pdf')
    }

    const onDownload: SubmitHandler<ScheduleReport> = (data) => {
        setValue('type', 'download')
        mutate({
            ...data,
        })
    }

    const onSubmit: SubmitHandler<ScheduleReport> = (data) => {
        mutate({
            ...data,
        })
        setValue('type', 'view')
    }
    
    return {
        reset,
        register,
        handleSubmit,
        control,
        errors,
        onSubmit,
        isLoadingMutate,
        dataScheduleReport,
        onDownload
    }
}

export default useScheduleReport;