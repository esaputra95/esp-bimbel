import { SubmitHandler, useForm } from "react-hook-form"
import { ChangePasswordInterface } from "../../../interfaces/loginInterface"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { changePasswordModel } from "../../models/auth/forgotPasswordModel"
import { useMutation } from "@tanstack/react-query"
import url from "../../../services/url"
import { AxiosError } from "axios"
import { useState } from "react"

const useChangePassword = () => {
    const [statusChangePassword, setStatusChangePassword]= useState(false);
    const { auth } = url
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ChangePasswordInterface>({
        resolver: yupResolver(
            yup.object({
                password: yup.string().required(),
                newPassword: yup.string().required(),
                confirmNewPassword: yup.string().required()
                .oneOf([yup.ref('newPassword')], 'Password baru dan konfirmasi password harus sama')
            })
        )
    });

    const { mutate } = useMutation({
        mutationFn: async ( data:ChangePasswordInterface ) => await changePasswordModel(auth.changePassword, data),
        onSuccess: ()=> {
            setStatusChangePassword(true);
        }, onError:(errors) => {
            const err = errors as AxiosError<{message: string}>
            setError('password', {
                message: err.response?.data?.message
            })
        }
    })

    const onSubmit: SubmitHandler<ChangePasswordInterface> = (data) => {
        mutate(data)
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        statusChangePassword
    }
}

export default useChangePassword