import Table from './Table'
import TablePaging from './TablePaging'
import { useSession } from '../../../../hooks/fetch/schedule/useSession'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormSession from './form'
import { Button } from '../../../../components/input'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useStudent } from '../../../../hooks/fetch/master/useStudent'
import { useCourse } from '../../../../hooks/fetch/master/useCourse'
import { t } from 'i18next'
import { useClassMaster } from '../../../../hooks/fetch/master/useClassMaster'

const SessionPage = () => {
    const {
        dataSession, 
        isFetching,
        errors,
        isLoadingMutate,
        register,
        onSubmit,
        handleSubmit,
        fields,
        fieldDate,
        modalForm,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page,
        control,
        append,
        appendDate,
        remove,
        removeDate,
        setValue,
        getValues,
        updateStatus,
        handleOnChangeTime,
        handleOnChangeSession,
        handleOnChangeSessionDetail,
        onCancelSession,
        appendIdDeleteSessionDetail,
        dataGroup,
        optionTutorSchedule,
        dataOptionTutor,
        handleOpenForm,
        dataOptionRoom,
        optionRoomSchedule
    } = useSession()

    const { 
        optionStudent,
        dataOptionStudent
    } = useStudent();
    
    const {
        optionCourse,
        dataOptionCourse
    } = useCourse()

    const {
        optionClassMaster,
        dataOptionClassMaster
    } = useClassMaster()

    return (
        <div className='w-full'>
            <div className='w-full bg-green-100 rounded-md p-4'>
                <span>
                    {t("study-groups")} :
                </span>
                <span className='font-semibold'>
                    {
                        ' '+dataGroup?.studyGroup.name
                    }
                </span>
            </div>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="full"
            >
                <FormSession
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    control={control}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    fields={fields}
                    fieldDate={fieldDate}
                    appendDate={appendDate}
                    optionStudent={optionStudent}
                    append={append}
                    remove={remove}
                    removeDate={removeDate}
                    setValue={setValue}
                    getValues={getValues}
                    dataOptionStudent={dataOptionStudent}
                    updateStatus={updateStatus}
                    optionCourse={optionCourse}
                    dataOptionCourse={dataOptionCourse}
                    optionTutorSchedule={optionTutorSchedule}
                    dataOptionTutor={dataOptionTutor}
                    optionRoom={optionRoomSchedule}
                    dataOptionRoom={dataOptionRoom}
                    handleOnChangeTime={handleOnChangeTime}
                    handleOnChangeSession={handleOnChangeSession}
                    handleOnChangeSessionDetail={handleOnChangeSessionDetail}
                    appendIdDeleteSessionDetail={appendIdDeleteSessionDetail}
                    dataOptionClassMaster={dataOptionClassMaster}
                    optionClassMaster={optionClassMaster}
                />
            </ModalForm>
            <div className='w-full'>
                <div className='py-4'>
                    <Button 
                        onClick={()=> handleOpenForm()} 
                    >
                        + {t('session')}
                    </Button>
                </div>
                <Table
                    data={dataSession?.data?.schedule ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                    onCancelSession={onCancelSession}
                />
                <TablePaging
                    page={page.page}
                    total={page.total}
                    handlePage={page.handlePage}
                />
            </div>
        </div>
    )
}

export default SessionPage