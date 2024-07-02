import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterInterface } from "../../../interfaces/public/registerInterface"
import RegisterSchema from "../../../schema/publics/registerSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { postData } from "../../models/public/registerModel"
import url from "../../../services/url"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { handleMessageErrors } from "../../../services/handleErrorMessage"
import { DataMessageError } from "../../../interfaces/apiInfoInterface"
import { t } from "i18next"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { getDataSelect } from "../../models/registers/studentModel"
import { OptionDummy } from "../../../utils/dummy/setting"
import { OptionSelectInterface } from "../../../interfaces/globalInterface"

const useRegister = () => {
    const { Register, Package, Session, GuidanceType } = url;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<RegisterInterface>({
        resolver: yupResolver(RegisterSchema().schema)
    });

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:RegisterInterface)=> postData(Register.post, data),
        onSuccess: () => {
            // refetch()
            reset()
            toast.success(t("success-save"), {
                position: toast.POSITION.TOP_CENTER
            });
            setLoading(false)
            navigate('/message')
            
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

    const onSubmit: SubmitHandler<RegisterInterface> = (data) => {
        setLoading(true);
        mutate({
            ...data
        })
    }

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files?.[0] ?? ''
        setValue('imageUpload', event.target.files)
        setValue('image', URL.createObjectURL(image as Blob))
    }

    const optionPackage = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Package.getSelect, {name: data});
        if(response.status){
            return response.data.package
        }
        return [OptionDummy]
    }

    const optionSession = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(Session.getSelect, {name: data});
        if(response.status){
            return response.data.session
        }
        return response.data.guidanceType
    }


    const optionGuidanceType = async (data: string): Promise<OptionSelectInterface[]> => {
        const response = await getDataSelect(GuidanceType.getSelect, {name: data});
        if(response.status){
            return response.data.guidanceType
        }
        return response.data.guidanceType
    }

    return {
        register,
        errors,
        handleSubmit,
        control,
        onSubmit,
        isLoadingMutate,
        handleOnChange,
        getValues,
        optionGuidanceType,
        optionSession,
        optionPackage,
        loading
    }
}

export default useRegister