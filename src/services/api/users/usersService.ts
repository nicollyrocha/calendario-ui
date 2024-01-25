import { api } from '..';
import { User } from '../../../models/users.interface';

const cadastrar = async (userData: User) => {
	try {
		const { data } = await api.post('/users', userData);
		return data;
	} catch (error) {
		return error;
	}
};

const login = async (email: string, password: string) => {
	try {
		const { data } = await api.post('/login', { email, password });
		return data;
	} catch (error) {
		return error;
	}
};

const getUser = async (id: number) => {
	try {
		const { data } = await api.get(`/user/${id}`);
		return data;
	} catch (error) {
		return error;
	}
};

export const UsersService = {
	cadastrar,
	login,
	getUser,
};
