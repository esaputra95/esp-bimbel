import { api } from "../../../services";
import { PackageInterface, PackageSearchInterface } from "../../../interfaces/settings/packageInterface";
import { AxiosError } from "axios";

interface ParamPackageInterface extends PackageSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamPackageInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

const postData = async (url:string, data:PackageInterface) => {
	try {
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
		const err = error as AxiosError
		throw err;
	}
}

const deleteData = async (url:string, id:string) => {
	try {
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}

const getDataById = async (url:string, id:string) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data.data.package
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}

const getDataSelect = async (url:string, params: {name: string}) => {
	try {
		const response = await api.get(url, {params: {...params}})
		return response.data
	} catch (error) {
		const err = error as AxiosError
		throw err;
	}
}

export { getData, postData, deleteData, getDataById, getDataSelect };
