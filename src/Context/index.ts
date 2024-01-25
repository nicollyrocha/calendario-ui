import { useEffect, useState } from 'react';
import { User } from '../models/users.interface';
import { UsersService } from '../services/api/users/usersService';
import { EventsService } from '../services/api/users/eventsService';
import { Event } from '../models/event.interface';

export const Context = () => {
	const [userLoggedData, setUserLoggedData] = useState<User>({
		email: '',
		name: '',
		password: '',
	});
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		if (localStorage.getItem('id')) {
			UsersService.getUser(Number(localStorage.getItem('id'))).then((res: any) => {
				if (res) {
					setUserLoggedData({
						...userLoggedData,
						email: res.body.user.email,
						name: res.body.user.name,
						id: res.body.user.id,
					});
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (localStorage.getItem('id')) {
			EventsService.getEventsFromUser(Number(localStorage.getItem('id'))).then(
				(res) => {
					if (res && res.status === 201) {
						const eventsFormatted = res.body.events.map((event: Event) => {
							event.dateEnd = new Date(
								`${event?.dateEnd?.toLocaleString().substring(0, 10)} ${event?.dateEnd
									?.toLocaleString()
									.substring(11, 16)}`
							);
							event.dateStart = new Date(
								`${event?.dateStart
									?.toLocaleString()
									.substring(0, 10)} ${event?.dateStart
									?.toLocaleString()
									.substring(11, 16)}`
							);
							return event;
						});
						setEvents(eventsFormatted);
					} else {
						setEvents([]);
					}
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		userLoggedData,
		events,
	};
};
