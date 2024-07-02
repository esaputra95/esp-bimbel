import FormRegister from './form'
import useRegister from '../../../hooks/fetch/public/useRegister'

const RegisterPage = () => {
    const { 
        register,
        errors,
        handleSubmit,
        onSubmit,
        control,
        handleOnChange,
        getValues,
        optionSession,
        optionGuidanceType,
        optionPackage,
        loading
    } = useRegister();

    return (
        <FormRegister
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            optionPackage={optionPackage}
            control={control}
            optionSession={optionSession}
            optionGuidanceType={optionGuidanceType}
            handleOnChange={handleOnChange}
            getValues={getValues}
            isLoadingMutate={loading}
        />
    )
}

export default RegisterPage