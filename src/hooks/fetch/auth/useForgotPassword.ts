import { SubmitHandler, useForm } from "react-hook-form"
import { ForgotPasswordInterface } from "../../../interfaces/loginInterface"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { forgotPasswordModel } from "../../models/auth/forgotPasswordModel"
import { useMutation } from "@tanstack/react-query"
import url from "../../../services/url"
import { toast } from "react-toastify"

const useForgotPassword = () => {
    const { auth } = url
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ForgotPasswordInterface>({
        resolver: yupResolver(
            yup.object({
                email: yup.string().required()
            })
        )
    });

    const { mutate } = useMutation({
        mutationFn: async ( data:ForgotPasswordInterface ) => await forgotPasswordModel(auth.forgotPassword, data),
        onSuccess: (data)=> {
            if(!data.status){
                setError('email', {
                    message:'Kamu memasukkan email yang salah'
                })
            }else{
                toast.success('Cek email Kamu untuk melihat password baru')
            }
        }
    })

    const onSubmit: SubmitHandler<ForgotPasswordInterface> = (data) => {
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

export default useForgotPassword