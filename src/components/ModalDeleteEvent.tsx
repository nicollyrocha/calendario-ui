import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { EventsService } from '../services/api/users/eventsService';

export default function ModalDeleteEvent({
	openModalDelete,
	setOpenModalDelete,
	id,
}: {
	openModalDelete: boolean;
	setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
	id: number | null;
}) {
	const [loading, setLoading] = useState(false);
	const handleClose = () => {
		setOpenModalDelete(false);
	};

	const onClickDelete = () => {
		setLoading(true);
		if (id) {
			EventsService.deleteEvent(id).then((res: any) => {
				if (res) {
					setTimeout(() => {
						setLoading(false);
						setOpenModalDelete(false);
						window.location.reload();
					}, 2000);
				} else {
					setTimeout(() => {
						setLoading(false);
					}, 2000);
				}
			});
		}
	};

	return (
		<Dialog
			open={openModalDelete}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			className='flex flex-col gap-3'
		>
			<DialogTitle id='alert-dialog-title'>Excluindo evento</DialogTitle>
			<DialogContent className='flex flex-col gap-3'>
				Certeza que deseja excluir este evento?
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button color='error' onClick={() => onClickDelete()} autoFocus>
					{loading ? <CircularProgress color='inherit' /> : 'Sim'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
