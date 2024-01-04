import { api } from "../../../services";
import {  RecordMateriInterface, RecordMateriSearchInterface } from "../../../interfaces/recordMateri/RecordMateriInterface";
import { AxiosError } from "axios";

interface ParamRecordMateriInterface extends RecordMateriSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

interface StudyGroupInterface {
	name:string;
	tentorId: string;
}

const getData = async (url:string, params:ParamRecordMateriInterface) => {
	const response = await api.get(url, { params: { ...params } });
	return response.data
};

const postData = async (url:string, data:RecordMateriInterface) => {
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
		return error;
	}
}

const deleteData = async (url:string, id:string) => {
	try {
		console.log('dlete');
		
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		return error
	}
}

const getDataById = async (url:string, id:string) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data
	} catch (error) {
		return error
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

const getStudyGroup = async (url:string, data:StudyGroupInterface) => {
	try {
		const response = await api.get(url,{ params: data});
		return response.data.data.studyGroup
	} catch (error) {
		return error as AxiosError
	}
}

type ListParamData = {
	tentorId: string;
	date: string;
	groupId: string;
}


const getListStudent = async (url:string, data:ListParamData) => {
	try {
		const response = await api.post(url, data)
		console.log({response});
		
		return response.data
	} catch (error) {
		return error as AxiosError
	}
}


export {
	getData,
	postData,
	deleteData,
	getDataById,
	getDataSelect,
	getStudyGroup,
	getListStudent
};
