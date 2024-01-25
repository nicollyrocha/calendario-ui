import { Alert, Backdrop, Button, Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { UsersService } from '../services/api/users/usersService';
import { User } from '../models/users.interface';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const CardLogin = () => {
	const [create, setCreate] = useState(true);
	const [userData, setUserData] = useState<User>({
		name: '',
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ value: false, message: '' });
	const [errorCreateLogin, setErrorCreateLogin] = useState({
		value: false,
		message: '',
	});

	if (localStorage.getItem('logado') === 'true') {
		window.open('/home', '_self');
	}

	const createUser = async () => {
		setLoading(true);
		UsersService.cadastrar(userData)
			.then((res: any) => {
				if (res) {
					if (res.status === 409) {
						setTimeout(() => {
							setLoading(false);
						}, 1000);
						setErrorCreateLogin({
							value: true,
							message: res.message,
						});
					} else {
						setTimeout(() => {
							setLoading(false);
						}, 1000);
						setCreate(false);
					}
				}
			})
			.catch((error) => {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
				setErrorCreateLogin({
					value: true,
					message: error.response.body.message,
				});
			});
	};

	const login = async () => {
		setLoading(true);
		UsersService.login(userData.email, userData.password)
			.then((res: any) => {
				if (res) {
					if (res.status === 401) {
						setTimeout(() => {
							setLoading(false);
						}, 1000);
						setErrorCreateLogin({
							value: true,
							message: res.response.data.message,
						});
					} else if (res.status === 201) {
						localStorage.setItem('id', JSON.stringify(res.body.user.id));
						localStorage.setItem('logado', 'true');
						setTimeout(() => {
							setLoading(false);
						}, 1000);

						window.open('/home', '_self');
					} else {
						setTimeout(() => {
							setLoading(false);
						}, 1000);
						setErrorCreateLogin({
							value: true,
							message: res.response.data.message,
						});
					}
				}
			})
			.catch((error: any) => {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
				setErrorCreateLogin({
					value: true,
					message: error.message,
				});
			});
	};

	const isValidEmail = (email: string) => {
		const validRegex =
			/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;

		if (email.match(validRegex)) {
			setError({ value: false, message: '' });
		} else {
			setError({ value: true, message: 'E-mail inválido' });
		}
	};

	const onClickCriarConta = () => {
		setError({ value: false, message: '' });
		setCreate(true);
	};

	return (
		<div className='w-8/12 flex rounded h-[458px]'>
			{errorCreateLogin.value ? (
				<Snackbar
					open={errorCreateLogin.value}
					onClose={() => setErrorCreateLogin({ value: false, message: '' })}
				>
					<Alert
						onClose={() => setErrorCreateLogin({ value: false, message: '' })}
						severity='error'
						variant='filled'
						sx={{ width: '100%' }}
					>
						{errorCreateLogin.message}
					</Alert>
				</Snackbar>
			) : (
				<></>
			)}
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color='inherit' />
			</Backdrop>

			<div className='bg-blue-400 w-5/12 rounded-l-lg flex items-center justify-center flex-col gap-5'>
				<div className='text-white font-bold text-2xl'>Bem vindo!</div>
			</div>
			<div className='bg-white w-7/12 rounded-r-lg flex items-center justify-center flex-col gap-7 py-12'>
				{create ? (
					<>
						<div className='font-bold text-2xl text-blue-400'>Criar Conta</div>
						<div className='flex flex-col gap-3 w-full px-10 items-center'>
							<TextField
								className='w-8/12'
								style={{ backgroundColor: '#F5F5F5' }}
								required
								label='Nome'
								variant='outlined'
								value={userData.name}
								onChange={(e) => setUserData({ ...userData, name: e.target.value })}
							/>
							<TextField
								className='w-8/12'
								style={{ backgroundColor: '#F5F5F5' }}
								required
								label='E-mail'
								variant='outlined'
								type='email'
								value={userData.email}
								onChange={(e) => setUserData({ ...userData, email: e.target.value })}
								onBlur={() => isValidEmail(userData.email)}
							/>
							{error.value ? (
								<Alert
									className='flex items-center w-8/12'
									icon={<ErrorOutlineIcon fontSize='inherit' />}
									severity='error'
									onClose={() => setError({ value: false, message: '' })}
								>
									{error.message}
								</Alert>
							) : (
								<></>
							)}
							<TextField
								type='password'
								className='w-8/12'
								style={{ backgroundColor: '#F5F5F5' }}
								required
								label='Senha'
								variant='outlined'
								value={userData.password}
								onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							/>
						</div>
						<div className='flex flex-row items-center gap-2'>
							<div>Já possui uma conta?</div>
							<Button variant='text' onClick={() => setCreate(false)}>
								Login
							</Button>
						</div>

						<Button
							style={{ borderRadius: '20px' }}
							className='rounded-lg'
							variant='contained'
							onClick={() => createUser()}
							disabled={
								!userData.name || !userData.email || !userData.password || error.value
							}
						>
							Criar
						</Button>
					</>
				) : (
					<>
						<div className='font-bold text-2xl text-blue-400'>Fazer Login</div>
						<div className='flex flex-col gap-3 w-full px-10 items-center'>
							<TextField
								className='w-8/12'
								style={{ backgroundColor: '#F5F5F5' }}
								required
								label='E-mail'
								variant='outlined'
								type='email'
								value={userData.email}
								onChange={(e) => setUserData({ ...userData, email: e.target.value })}
								onBlur={() => isValidEmail(userData.email)}
							/>
							{error.value ? (
								<Alert
									className='flex items-center w-8/12'
									icon={<ErrorOutlineIcon fontSize='inherit' />}
									severity='error'
									onClose={() => setError({ value: false, message: '' })}
								>
									{error.message}
								</Alert>
							) : (
								<></>
							)}
							<TextField
								type='password'
								className='w-8/12'
								style={{ backgroundColor: '#F5F5F5' }}
								required
								label='Senha'
								variant='outlined'
								value={userData.password}
								onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							/>
						</div>
						<div className='flex flex-row items-center gap-2'>
							<div>Ainda não possui uma conta?</div>
							<Button variant='text' onClick={() => onClickCriarConta()}>
								Criar
							</Button>
						</div>

						<Button
							style={{ borderRadius: '20px' }}
							className='rounded-lg'
							variant='contained'
							onClick={() => login()}
							disabled={error.value || !userData.email || !userData.password}
						>
							Login
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
