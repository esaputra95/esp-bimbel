import { FC } from 'react'
import { DataPayrollInterface } from '../../../../interfaces/reports/payrollReportInterface'
import { t } from 'i18next';

const Data: FC<DataPayrollInterface> = (props) => {
    const { dataPayrollReport } = props;
    return (
        <div className='w-full'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='p-2'>
                            {t('name')}
                        </th>
                        <th className='p-2'>
                            {t('month')}
                        </th>
                        <th className='p-2'>
                            {t('basic-salary')}
                        </th>
                        <th className='p-2'>
                            {t('session-salary')}
                        </th>
                        <th className='p-2'>
                            {t('total')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataPayrollReport?.map((value)=>(
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                {
                                    value.map((val)=> (
                                        <td className='p-2'>
                                            {val}
                                        </td> 
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Data