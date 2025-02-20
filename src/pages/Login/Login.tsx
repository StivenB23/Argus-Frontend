import React from 'react';
import './Login.css';

import LogoArgus from '@assets/img/Argus-Logo.svg'

export type LoginProps = {

}

const Login: React.FC<LoginProps>  = ({}) => {
	return (
		<section className='login'>
 			<article>
				<form action="">
					<img src={LogoArgus} alt="" width={200} />
					<label htmlFor="email">Email</label>
					<input type="text" id="email" />
					<label htmlFor="password">Contraseña</label>
					<input type="password" name="" id="password" />
				</form>
			</article>
			<article className='login--banner'>
				<img src="" alt="" />
			</article>
 		</section>
	);
};

export default Login;
