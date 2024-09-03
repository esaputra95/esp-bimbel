import { SubmitHandler, useForm } from "react-hook-form"
import { ChangePasswordInterface } from "../../../interfaces/loginInterface"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { changePasswordModel } from "../../models/auth/forgotPasswordModel"
import { useMutation } from "@tanstack/react-query"
import url from "../../../services/url"

const useChangePassword = () => {
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
                confirmNewPassword: yup.string().required(),
            })
        )
    });

    const { mutate } = useMutation({
        mutationFn: async ( data:ChangePasswordInterface ) => await changePasswordModel(auth.changePassword, data),
        onSuccess: (data)=> {
            console.log({data});
            
            if(!data.status){
                setError('password', {
                    message:'Kamu memasukkan password yang salah'
                })
            }
        }
    })

    const onSubmit: SubmitHandler<ChangePasswordInterface> = (data) => {
        console.log({data});
        
        mutate(data)
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }
}

export default useChangePassword