import { api } from "../../../services";
import { MajorSearchInterface } from "../../../interfaces/master/majorInterface";
import { AxiosError } from "axios";

interface ParamMajorInterface extends MajorSearchInterface {
  	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamMajorInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

const postData = async (url:string, data:any) => {
	try {
		delete data.university
		if(data.id){
			const response = await api.put(`${url}/${data.id}`, data);
			if(response.status === 200) return response.data
			throw response;
		}else{
			const response = await api.post(url, data);
			if(response.status === 200) return response.data
			throw response;
		}
	} catch (error) {
		throw error;
	}
}

const deleteData = async (url:string, id:string) => {
	try {
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		return error
	}
}

const getDataById = async (url:string, id:string) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data.data.major
	} catch (error) {
		return error
	}
}

const getDataSelect = async (url:string, params: {name: string}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		let err = error as AxiosError
		throw err;
	}
}

export { getData, postData, deleteData, getDataById, getDataSelect };
