import { CircularProgress, TextField } from '@mui/material';
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
import dayjs from 'dayjs';

export default function ModalEditEvent({
	openModal,
	setOpenModal,
	eventData,
	eventDataNew,
	setEventDataNew,
}: {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	eventData: Event | null;
	eventDataNew: Event;
	setEventDataNew: React.Dispatch<React.SetStateAction<Event>>;
}) {
	const dataContext = Context();
	const [loading, setLoading] = useState(false);
	const handleClose = () => {
		setOpenModal(false);
	};

	const onClickEdit = () => {
		setLoading(true);
		EventsService.editEvent(eventDataNew).then((res: any) => {
			if (res) {
				setTimeout(() => {
					setLoading(false);
					setOpenModal(false);
					window.location.reload();
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
			<DialogTitle id='alert-dialog-title'>Editar Evento</DialogTitle>
			<DialogContent className='flex flex-col gap-3'>
				<TextField
					className='w-full'
					style={{ backgroundColor: '#F5F5F5', marginTop: '10px' }}
					required
					label='Nome'
					variant='outlined'
					value={eventDataNew.nameEvent}
					onChange={(e) =>
						setEventDataNew({
							...eventDataNew,
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
					value={eventDataNew.description}
					onChange={(e) =>
						setEventDataNew({ ...eventDataNew, description: e.target.value })
					}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
						<DateTimePicker
							value={eventDataNew ? dayjs(eventDataNew?.dateStart) : null}
							onChange={(value) =>
								value && eventDataNew
									? setEventDataNew({
											...eventDataNew,
											dateStart: value.toDate(),
									  })
									: {}
							}
							label='Início'
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
								seconds: renderTimeViewClock,
							}}
						/>
						<DateTimePicker
							value={eventDataNew ? dayjs(eventDataNew?.dateEnd) : null}
							onChange={(value) =>
								value && eventDataNew
									? setEventDataNew({
											...eventDataNew,
											dateEnd: value.toDate(),
									  })
									: {}
							}
							minDate={eventDataNew.dateStart ? dayjs(eventDataNew?.dateStart) : null}
							minTime={dayjs(eventDataNew?.dateStart).add(5, 'minute')}
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
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={() => onClickEdit()} autoFocus>
					{loading ? <CircularProgress color='inherit' /> : 'Confirmar'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
