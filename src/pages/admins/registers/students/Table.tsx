import {
    BsEyeFill,
    BsFillTrashFill,
    BsPencilFill,
    BsFileEarmarkArrowDownFill,
    BsPrinterFill
} from "react-icons/bs";
import { FC } from "react";
import { StudentTableInterface } from "../../../../interfaces/registers/studentInterface";
import { useTranslation } from "react-i18next";
import Skeleton from "../../../../components/ui/Skeleton";

type TableProps = {
    data?: StudentTableInterface[],
    isFetching?: boolean,
    page: number,
    limit: number,
    onDelete:(id:string)=>void,
    onUpdate:(id:string)=>void,
    onDetail:(id:string)=>void,
    onOpenRegister: (id: string) => Promise<void>;
    printAddress: (id: string) => Promise<void>;
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'name' },
    { label: 'phone' },
    { label: 'phone-parent' },
    { label: 'gender' },
    { label: 'study-program' },
    { label: 'school' },
    { label: 'image' },
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
        onUpdate,
        onDetail,
        onOpenRegister,
        printAddress,
    } = props;
    const { t } = useTranslation()
    const number:number = ((page-1)*limit)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            header.map((value)=>(
                                <th key={Math.random()} scope="col" className={`px-6 py-3 ${value.width ?? ''}`}>
                                    {t(value.label)}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        !isFetching && data && data.length > 0 ? data.map((value, index)=>(
                            <tr 
                                key={value.id} 
                                className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {(number+index+1)}
                                </th>
                                <td className="px-6 py-4">
                                    {value.name}
                                </td>
                                <td className="px-6 py-4">
                                    {value.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {value.parentPhone}
                                </td>
                                <td className="px-6 py-4">
                                    {value.gender}
                                </td>
                                <td className="px-6 py-4">
                                    {value.statusStudy}
                                </td>
                                <td className="px-6 py-4">
                                    {value.school}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={import.meta.env.VITE_API_URL+`/static/${value.image}`} className="h-16 w-16 rounded-full"/>
                                </td>
                                <td className="px-6 py-4 flex">
                                    <span 
                                        title="Update" 
                                        className="p-1.5 flex bg-green-50 hover:bg-green-100 hover:cursor-pointer rounded-full" 
                                        onClick={()=>onUpdate(value.id ?? '')}
                                    >
                                        <BsPencilFill className='text-green-600' />
                                    </span>
                                    <span 
                                        title="Detail"
                                        className="p-1.5 bg-cyan-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full"
                                        onClick={()=>onDetail(value.id ?? '')}
                                    >
                                        <BsEyeFill className='text-cyan-600' />
                                    </span>
                                    <span
                                        title="Data Pendaftaran"
                                        className="p-1.5 bg-deep-purple-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full"
                                        onClick={()=>onOpenRegister(value.id ?? '')}
                                    >
                                        <BsFileEarmarkArrowDownFill className='text-deep-purple-300' />
                                    </span>
                                    <span
                                        title="Cetak alamat"
                                        className="p-1.5 bg-blue-50 hover:bg-cyan-100 hover:cursor-pointer rounded-full"
                                        onClick={()=>printAddress(value.id ?? '')}
                                    >
                                        <BsPrinterFill className='text-blue-600' />
                                    </span>
                                    
                                    <span
                                        title={t("delete")}
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