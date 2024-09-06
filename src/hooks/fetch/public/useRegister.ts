import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterInterface } from "../../../interfaces/public/registerInterface"
import RegisterSchema from "../../../schema/publics/registerSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { postData, uploadImage } from "../../models/public/registerModel"
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
        setError,
        formState: { errors },
    } = useForm<RegisterInterface>({
        resolver: yupResolver(RegisterSchema().schema)
    });

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:RegisterInterface)=> postData(Register.post, data),
        onSuccess: () => {
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

    const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
        setLoading(true);
        if(data.imageUpload){
            const upload = await uploadImage(data.imageUpload)
            // if(upload){
                mutate({
                    ...data,
                    image: upload
                })
            // } else {
            //     setLoading(false)
            //     toast.error('Photo yang kamu pilih tidak sesuai, mohon baca ketentuan upload Photo', {
            //         position: toast.POSITION.TOP_CENTER
            //     });
            // }
        }else{
            setLoading(false)
            toast.error('Photo yang kamu pilih tidak sesuai, mohon baca ketentuan upload Photo', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        setLoading(false)
    }

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        const maxFileSize = 1 * 1024 * 1024;
        const image = event.target.files?.[0]
        if(image?.size && image.size < maxFileSize ){
            setValue('imageUpload', event.target.files)
            setValue('image', URL.createObjectURL(image as Blob))
            setError('imageUpload', {})
        } else {
            setError('imageUpload', {message: 'Maximal size gambar 10 mb, silahkan pilih ukuran gambar yang lebih kecil'})
        }
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