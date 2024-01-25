import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Context } from '../Context';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ModalDeleteEvent from './ModalDeleteEvent';
import EditIcon from '@mui/icons-material/Edit';
import ModalEditEvent from './ModalEditEvent';
import { Event } from '../models/event.interface';
import { FormatDate } from '../functions/formatDate';

export default function TableEvents() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [idEvent, setIdEvent] = useState<number | null>(null);
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [openModalEdit, setOpenModalEdit] = useState(false);
	const [eventData, setEventData] = useState<Event | null>(null);
	const dataContext = Context();

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleClickDelete = (id: number) => {
		setIdEvent(id);
		setOpenModalDelete(true);
	};

	const [eventDataNew, setEventDataNew] = useState<Event>({
		dateStart: '',
		dateEnd: '',
		nameEvent: '',
		description: '',
		idUser: 0,
		id: undefined,
	});

	return (
		<Paper sx={{ overflow: 'hidden' }} className='mx-5 mt-5'>
			<ModalDeleteEvent
				id={idEvent}
				openModalDelete={openModalDelete}
				setOpenModalDelete={setOpenModalDelete}
			/>
			<ModalEditEvent
				eventDataNew={eventDataNew}
				setEventDataNew={setEventDataNew}
				eventData={eventData}
				openModal={openModalEdit}
				setOpenModal={setOpenModalEdit}
			/>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table>
					<TableHead>
						<TableRow style={{ fontStyle: 'bold' }}>
							<TableCell style={{ fontStyle: 'bold' }}>Nome</TableCell>
							<TableCell>Descrição</TableCell>
							<TableCell>Data início</TableCell>
							<TableCell>Data fim</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataContext.events
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								const dateStart = row.dateStart ? FormatDate(row.dateStart) : '';
								const dateEnd = row.dateEnd ? FormatDate(row.dateEnd) : '';
								return (
									<TableRow
										key={row.nameEvent}
										style={{
											backgroundColor:
												row.dateStart && row.dateStart < new Date() ? '#DCDCDC' : 'white',
										}}
									>
										<TableCell
											align='left'
											style={{
												color:
													row.dateStart && row.dateStart < new Date() ? '#C0C0C0' : 'black',
											}}
										>
											{row.nameEvent}
										</TableCell>
										<TableCell
											style={{
												color:
													row.dateStart && row.dateStart < new Date() ? '#C0C0C0' : 'black',
											}}
											align='left'
										>
											{row.description}
										</TableCell>
										<TableCell
											style={{
												color:
													row.dateStart && row.dateStart < new Date() ? '#C0C0C0' : 'black',
											}}
											align='left'
										>
											{dateStart}
										</TableCell>
										<TableCell
											style={{
												color:
													row.dateStart && row.dateStart < new Date() ? '#C0C0C0' : 'black',
											}}
											align='left'
										>
											{dateEnd}
										</TableCell>
										<TableCell align='left'>
											<IconButton
												disabled={
													row.dateStart && row.dateStart < new Date() ? true : false
												}
												onClick={() => (row.id ? handleClickDelete(row.id) : {})}
												color='error'
												aria-label='delete'
											>
												<Delete />
											</IconButton>
										</TableCell>
										<TableCell align='left'>
											<IconButton
												disabled={
													row.dateStart && row.dateStart < new Date() ? true : false
												}
												onClick={() => {
													setEventData(row);
													setIdEvent(row.id ? row.id : 0);
													setOpenModalEdit(true);
													setEventDataNew({
														dateStart: row.dateStart,
														dateEnd: row.dateEnd,
														nameEvent: row.nameEvent,
														description: row.description,
														idUser: row.idUser,
														id: row.id,
													});
												}}
												aria-label='edit'
											>
												<EditIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={dataContext.events.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
