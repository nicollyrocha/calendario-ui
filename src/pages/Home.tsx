import { Backdrop, Button, CircularProgress, IconButton } from '@mui/material';
import TableEvents from '../components/TableEvents';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ModalCreateEvent from '../components/ModalCreateEvent';

export const Home = () => {
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const onClickLogout = () => {
		setLoading(true);
		setTimeout(() => {
			localStorage.clear();
			setLoading(false);
			window.open('/', '_self');
		}, 1000);
	};

	return (
		<div className='flex flex-col gap-2'>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
			<ModalCreateEvent openModal={openModal} setOpenModal={setOpenModal} />
			<div className='flex items-center justify-end pr-5 py-2 gap-4 bg-blue-500'>
				<IconButton
					onClick={() => setOpenModal(true)}
					style={{ backgroundColor: '#F8F8FF', color: '#3B82F6' }}
					aria-label='add'
				>
					<AddIcon />
				</IconButton>
				<Button
					style={{ backgroundColor: '#F8F8FF', color: '#3B82F6' }}
					variant='contained'
					onClick={() => onClickLogout()}
				>
					Logout
				</Button>
			</div>

			<TableEvents />
		</div>
	);
};
