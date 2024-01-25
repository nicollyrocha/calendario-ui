import { api } from '..';
import { Event } from '../../../models/event.interface';

const createEvent = async (eventData: Event) => {
	try {
		const { data } = await api.post('/events', eventData);
		return data;
	} catch (error) {
		return error;
	}
};

const getEventsFromUser = async (id: number) => {
	try {
		const { data } = await api.get(`/events/${id}`);
		return data;
	} catch (error) {
		return error;
	}
};

const deleteEvent = async (id: number) => {
	try {
		const { data } = await api.delete(`/event/${id}`);
		return data;
	} catch (error) {
		return error;
	}
};

const editEvent = async (eventData: Event) => {
	try {
		const { data } = await api.put(`/event/update`, eventData);
		return data;
	} catch (error) {
		return error;
	}
};

export const EventsService = {
	createEvent,
	getEventsFromUser,
	deleteEvent,
	editEvent,
};
