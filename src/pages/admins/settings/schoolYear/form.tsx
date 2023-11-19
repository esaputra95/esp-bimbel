import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { SchoolYearFormProps } from '../../../../interfaces/settings/schoolYearInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormSchoolYear: FC<SchoolYearFormProps> = (props) => {
    const { handleSubmit, onSubmit, register, onCancel, errors, isLoading, idDetail } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <InputText
                    {...register("name")}
                    errors={errors.name?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("name")} 
                />
                <InputText
                    {...register("startYear")}
                    errors={errors.startYear?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("start-date")}
                    type='date'
                />
                <InputText
                    {...register("endYear")}
                    errors={errors.endYear?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("end-date")}
                    type='date'
                />
                <InputText
                    {...register("description")}
                    errors={errors.description?.message} 
                    readOnly={idDetail?true:false} 
                    label={t("description")} 
                />
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button 
                    type='button' 
                    variant="error" 
                    onClick={onCancel} 
                    size="medium" 
                    className='my-4' 
                >
                    {t('cancel')}
                </Button>
                {!idDetail ?
                    <Button
                        disabled={isLoading?true:false}
                        variant="primary"
                        type='submit'
                        size="medium"
                        className='my-4' 
                    >
                        {t('save')} {isLoading?<Spinner />:null}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormSchoolYear