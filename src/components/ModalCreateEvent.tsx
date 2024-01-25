import { Alert, CircularProgress, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Event } from '../models/event.interface';
import { Context } from '../Context';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { EventsService } from '../services/api/users/eventsService';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ModalCreateEvent({
	openModal,
	setOpenModal,
}: {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dataContext = Context();

	const [eventData, setEventData] = useState<Event>({
		dateStart: '',
		dateEnd: '',
		nameEvent: '',
		description: '',
		idUser: dataContext.userLoggedData.id ? dataContext.userLoggedData.id : 0,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ value: false, message: '' });
	const handleClose = () => {
		setOpenModal(false);
	};

	dayjs.extend(utc);
	dayjs.extend(timezone);

	const onClickCreate = () => {
		setLoading(true);
		EventsService.createEvent(eventData).then((res: any) => {
			if (res && res.response.status === 201) {
				setTimeout(() => {
					setLoading(false);
					setOpenModal(false);
					window.location.reload();
				}, 2000);
			}
			if (res && res.response.status === 401) {
				setTimeout(() => {
					setLoading(false);
					setError({
						value: true,
						message: res.response.data.message,
					});
				}, 2000);
			} else {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			}
		});
	};

	return (
		<Dialog
			open={openModal}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			className='flex flex-col gap-3'
		>
			<DialogTitle id='alert-dialog-title'>Criar Evento</DialogTitle>
			<DialogContent className='flex flex-col gap-3'>
				<TextField
					className='w-full'
					style={{ backgroundColor: '#F5F5F5', marginTop: '10px' }}
					required
					label='Nome'
					variant='outlined'
					value={eventData.nameEvent}
					onChange={(e) =>
						setEventData({
							...eventData,
							nameEvent: e.target.value,
							idUser: dataContext.userLoggedData.id
								? dataContext.userLoggedData.id
								: 0,
						})
					}
				/>
				<TextField
					className='w-full'
					style={{ backgroundColor: '#F5F5F5' }}
					required
					label='Descrição'
					variant='outlined'
					value={eventData.description}
					onChange={(e) =>
						setEventData({ ...eventData, description: e.target.value })
					}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
						<DateTimePicker
							timezone='UTC'
							value={eventData.dateStart || null}
							onChange={(value) => setEventData({ ...eventData, dateStart: value })}
							label='Início'
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
								seconds: renderTimeViewClock,
							}}
						/>
						<DateTimePicker
							timezone='UTC'
							value={eventData.dateEnd || null}
							onChange={(value) => setEventData({ ...eventData, dateEnd: value })}
							minDate={eventData.dateStart ? eventData.dateStart : null}
							minTime={
								eventData.dateStart &&
								eventData.dateEnd &&
								eventData.dateStart >= eventData.dateEnd
									? eventData.dateStart
									: null
							}
							label='Fim'
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
								seconds: renderTimeViewClock,
							}}
						/>
					</DemoContainer>
				</LocalizationProvider>
			</DialogContent>
			{error.value === true ? (
				<Alert
					className='flex items-center w-full'
					icon={<ErrorOutlineIcon fontSize='inherit' />}
					severity='error'
					onClose={() => setError({ value: false, message: '' })}
				>
					{error.message}
				</Alert>
			) : (
				<></>
			)}
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={() => onClickCreate()} autoFocus>
					{loading ? <CircularProgress color='inherit' /> : 'Criar'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
