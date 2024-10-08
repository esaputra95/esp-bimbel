import { Button, InputText } from '../../components/input'
import { useLogin } from '../../hooks//fetch/auth/useLogin'

const LoginPage = () => {
    const {
        handleSubmit,
        onSubmit,
        register,
        errors,
    } = useLogin()
    return (
        <div className='w-full h-screen flex bg-gray-100 justify-center items-center'>
            <div className='w-full lg:w-6/12 rounded-lg bg-blue-200 lg:flex lg:justify-between'>
                <div className='w-full lg:w-6/12 flex flex-col p-8 gap-y-4 justify-center items-center'>
                    <label className='font-semibold text-lg text-gray-700'>
                        Selamat Datang
                    </label>
                    <label className='text-center  text-gray-700'>
                        Selamat datang kembali, Silahkan masukkan Username dan Password untuk mengakses Aplikasi 
                    </label>
                </div>
                <div className='w-full lg:w-6/12 bg-white shadow-md rounded-r-lg p-8 space-y-4'>
                    <label className='flex justify-center font-bold text-3xl  text-gray-700'>
                        MASUK
                    </label>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-y-4'>
                            <InputText 
                                {...register('username')}
                                label='Username'
                                type='text'
                                errors={errors.username?.message}
                            />
                            <InputText
                                {...register('password')}
                                label='Password'
                                type='password'
                                errors={errors.password?.message}
                            />
                            <Button 
                                type='submit'
                                variant='primary'
                            >
                                Login
                            </Button>
                            <a href='/forgot-password'
                                className='font-light text-sm text-gray-700'>
                                Lupa password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage