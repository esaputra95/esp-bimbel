import { Button, InputText } from '../../components/input'
import useChangePassword from '../../hooks/fetch/auth/useChangePassword'

const ChangePassword = () => {
    const {
        handleSubmit,
        register,
        errors,
        onSubmit,
        statusChangePassword
    } = useChangePassword()
    return (
        <div className='w-full h-screen flex bg-gray-100 justify-center items-center'>
            {
                !statusChangePassword ? (
                    <div className='w-full lg:w-3/12 rounded-lg bg-blue-200'>
                        <div className='w-full flex flex-col p-8 gap-y-4 justify-center items-center'>
                            <label className='font-semibold text-lg text-gray-700'>
                                Ubah Password
                            </label>
                        </div>
                        <div className='w-full bg-white shadow-md rounded-b-lg p-8 space-y-4'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex flex-col gap-y-4'>
                                    <InputText
                                        {...register('password')}
                                        label='Password Sekarang'
                                        type='password'
                                        errors={errors.password?.message}
                                    />
                                    <InputText
                                        {...register('newPassword')}
                                        label='Password Baru'
                                        type='password'
                                        errors={errors.newPassword?.message}
                                    />
                                    <InputText
                                        {...register('confirmNewPassword')}
                                        label='Konfirmasi Password Baru'
                                        type='password'
                                        errors={errors.confirmNewPassword?.message}
                                    />
                                    <Button 
                                        type='submit'
                                        variant='primary'
                                    >
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className='h-screen w-full bg-white flex flex-col items-center justify-center'>
                        <label>Password berhasil diubah</label>
                        <a className="p-3 bg-blue-600 text-white rounded-md" href="dashboard">Beranda</a>
                    </div>
                )
            }
        </div>
    )
}

export default ChangePassword