import { useEffect, useState } from "react";
import adminService from "../Services/admin.services";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import logo from '../imagess/logo.jpg'
import Footer from "./Footer";

function LoginForm() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	useEffect(() => {localStorage.clear()})

	const navigate = useNavigate();

	const loginUser = (e) => {
		e.preventDefault();
		var email = username;

		const user = { email, password }
		console.log(user)
		
		adminService.login(user)
			.then(respose => {
				console.log("User Login Credentials Send", respose.data)

				if (respose.data.length === 0) {toast.error('Invalid Credentials', {style: {borderRadius: '10px',background: '#333',color: '#fff',},})}

				localStorage.setItem("user-token", JSON.stringify(respose.data))

				var data = JSON.parse(localStorage.getItem("user-token"));
				if (data.isadmin === true)
					{
						console.log("admin");
						navigate('/admin')
					} else if (data.isadmin === false) {
						console.log("user");
						navigate('/user')
					}
			})
			.catch(error => {console.log('Something Went Wrong', error);})
	}
	
	return (
		<div>
			<Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2200,}}/>

			<div className="container h-100">
				<div className="row justify-content-sm-center h-100">
					<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
						<div className="text-center my-3">
							<img src={logo} alt="logo" width="100" style={{ borderRadius: '50px' }} />
						</div>
						<div className="card shadow-lg">
							<div className="card-body p-5">
								<h1 className="fs-4 card-title fw-bold mb-4 text-center text-primary">Login</h1>
								<form onSubmit={(e) => loginUser(e)}>

									<label for="email" class="form-label">Username </label>
									<div class="input-group mb-4">
										<span class="input-group-text" id="basic-addon1"> <i class="fa fa-user" aria-hidden="true"></i></span>
										<input id="email" type="email" className="form-control" name="email" required autoFocus
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										placeholder="E-Mail Address"
									/>
									</div>

									<label for="password" class="form-label">Password </label>
									<div class="input-group mb-4">
										<span class="input-group-text" id="basic-addon1"> <i class="fa fa-unlock-alt" aria-hidden="true"></i></span>
										<input id="password" type="password" className="form-control" name="password" required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Password"
										/>
									</div>

									<div className="d-flex align-items-center">
										<button type="submit" className="btn btn-primary form-control">
											Login
										</button>
									</div>
								</form>
							</div>
							<div className="card-footer py-1 border-0">
								<div className="text-center mb-3">
									Don't have an account? <a href="/register" className="text-primary"> Create an Accaunt</a>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default LoginForm;