import { 
    BsEyeFill,
    BsFillTrashFill,
    BsArrowRightCircleFill,
    BsWhatsapp,
    BsFillSendFill,
} from "react-icons/bs";
import { FC } from "react";
import { RegistrationTableInterface } from "../../../../interfaces/registers/registrationInterface";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../../components/ui/Skeleton";
import { useNavigate } from "react-router-dom";
import { SelectOption } from "../../../../components/input";

type TableProps = {
    data?: RegistrationTableInterface[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:string)=>void,
    onUpdate:(id:string)=>void,
    onDetail:(id:string)=>void,
    sendMessage: (phone: string)=> void,
    changeStatusInvoice: (id:string, status:number) => void;
    updateModuleStatus: (id: string) => Promise<void>;
    onSort: (label: string) => Promise<void>;
    onChangeFilter: (name: string, value: string) => Promise<void>
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'name' },
    { label: 'packages' },
    { label: 'sessions'},
    { 
        label: 'status',
        sort: true
    },
    {
        label: 'module',
        sort: true
    },
    { 
        label: 'Action',
        width: 'w-16'
    },
] 

const Table: FC<TableProps> = (props) => {
    const { 
        data,
        isFetching,
        page,
        limit,
        onDelete,
        sendMessage,
        changeStatusInvoice,
        updateModuleStatus,
        onSort,
        onChangeFilter
    } = props;
    const { t } = useTranslation()
    const navigate = useNavigate()
    const number:number = ((page-1)*limit)
    return (
        <div className="relative overflow-x-auto max-h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            header.map((value)=>(
                                <th key={Math.random()} scope="col" className={`px-6 py-3 ${value.width ?? ''}`}>
                                    {
                                        value.sort? (<span className="hover:cursor-pointer" onClick={()=>onSort(value.label)}>{t(value.label)}</span>) : t(value.label)
                                    }
                                    
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="px-4">
                            <SelectOption
                                option={[
                                    {label:'active', value:'active'},
                                    {label:'non-active', value:'non-active'},
                                ]}
                                onChange={(e)=>onChangeFilter('status', e.target.value)}
                            />
                        </td>
                        <td className="px-4">
                            <SelectOption
                                option={[
                                    {label:'Dikirim', value:'send'},
                                    {label:'Ditunda', value:'pending'},
                                ]}
                                onChange={(e)=>onChangeFilter('isModule', e.target.value)}
                            />
                        </td>
                        <td></td>
                    </tr>
                    {
                        !isFetching && data && data.length > 0 ? data.map((value, index)=>(
                            <tr key={value.id} 
                                className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td scope="row" 
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {(number+index+1)}
                                </td>
                                <td className="px-6 py-4">
                                    {value.students?.name}
                                </td>
                                <td className="px-6 py-4">
                                    { value.packages?.name }
                                </td>
                                <td className="px-6 py-4">
                                    { value.sessions?.name }
                                </td>
                                <td className="px-6 py-4">
                                    { value.status === 0 ? 
                                    (<span className="bg-red-200 p-1 rounded-md text-white">non-active</span>) : 
                                    (<span className="bg-green-200 p-1 rounded-md text-white">active</span>) }
                                </td>
                                <td className="px-6 py-4">
                                    { value.isModule === 1 ? 
                                    (<span className="bg-green-200 p-1 rounded-md text-white">dikirim</span>) : 
                                    (<span className="bg-red-200 p-1 rounded-md text-white">tertunda</span>) }
                                </td>
                                <td className="grid grid-cols-3 gap-1">
                                    <span title="Change Status" 
                                        className="p-1.5 bg-cyan-100 hover:bg-cyan-200 hover:cursor-pointer rounded-full flex justify-center items-center" 
                                        onClick={()=> changeStatusInvoice(value.id ?? '', value.status ?? 0)}
                                    >
                                            <BsArrowRightCircleFill className='text-cyan-600' />
                                    </span>
                                    <span title="Send Chat"
                                        className="p-1.5 bg-deep-purple-100 hover:bg-purple-200 hover:cursor-pointer rounded-full"
                                        onClick={()=>sendMessage(value.students?.phone ?? '')}
                                    >
                                        <BsWhatsapp className='text-purple-700' />
                                    </span>
                                    <span title="Chat Orang Tua"
                                        className="p-1.5 bg-green-100 hover:bg-green-200 hover:cursor-pointer rounded-full"
                                        onClick={()=>sendMessage(value.students?.parentPhone ?? '')}
                                    >
                                        <BsWhatsapp className='text-green-700' />
                                    </span>
                                    <span
                                        title="Kirim module"
                                        className="p-1.5 bg-yellow-100 hover:bg-yellow-200 hover:cursor-pointer rounded-full"
                                        onClick={()=>updateModuleStatus(value.id ?? '')}
                                    >
                                        <BsFillSendFill className='text-yellow-800' />
                                    </span>
                                    <span title="Detail"
                                        className="p-1.5 bg-cyan-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full"
                                        onClick={()=>navigate(`/register?id=${value.id}`)}
                                    >
                                        <BsEyeFill className='text-cyan-600' />
                                    </span>
                                    <span title={t("delete")}
                                        className="p-1.5 bg-red-50 hover:bg-red-100 hover:cursor-pointer rounded-full" 
                                        onClick={()=>onDelete(value.id ?? '')}
                                    >
                                        <BsFillTrashFill className="text-red-600" />
                                    </span>
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
            {
                isFetching ? 
                <Skeleton cols={4} rows={2} /> : null
            }
            
        </div>
    )
}

export default Table