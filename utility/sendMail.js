const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
// create a transport
const transport = nodemailer.createTransport({
	host: process.env.email_host,
	port: process.env.email_port,
	auth: {
		user: process.env.email_user,
		pass: process.env.email_pass,
	},
});
const verifyedAccountMail = async (to, sub, data = {}) => {
	// create a mail
	await transport.sendMail({
		from: `"Account verify" <${process.env.email_host}>`,
		to: to,
		subject: sub,
		html: `
       <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			* {
				margin: 0px;
				padding: 0px;
			}
			ul {
				margin: 0;
				padding: 0;
			}
			li {
				list-style: none;
			}
			.main-wraper {
				height: 100vh;
				width: 100%;
				background-color: gray;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.wraper {
				background-color: white;
				width: 500px;
			    height: 325px;
				margin: 37px auto;

			}
			.all-text {
				margin-left: 40px;
				    margin-top: 20px;
			}
			.msg h2 {
				font-size: 20px;
				margin-bottom: 17px;
				margin-top: 6px;
			}
			.msg p {
				font-size: 18px;
				margin-bottom: 13px;
			}
			.msg a {
				font-size: 18px;
				margin-bottom: 17px;
				text-decoration: none;
				background-color: #0c576e;
				color: white;
				padding: 5px 10px;
				text-transform: uppercase;
			}
			.footer span {
				display: block;
				padding: 12px 0px;
				font-size: 17px;
			}
			.soical ul {
				display: flex;
				gap: 20px;
			}
		</style>
	</head>
	<body>
		<div class="main-wraper">
			<div class="wraper">
			<div class="all-text">
				<a href="">
					<img
						src="https://ci4.googleusercontent.com/proxy/cnzUwYXsEGGRI2QHI-T5JaE3Ely5qiZYkY5tkRiCENzdVbUOaxF3AE9T84zrF_rjtoEPW4wE-rRnSawGqJz8hojoLY0nXUfTU1m_2mmM3r8B=s0-d-e1-ft#https://mybdjobs.bdjobs.com/EmailNotification/img/bdj-logo.png"
						alt=""
					/>
				</a>
				<hr />
				<div class="msg">
					<h2>Hi Md shakil mia,</h2>
					<p>
						Hope you are all well. We are here to help you to get a perfect job.
						We find that you are missing opportunities for not completing your
						resume.
					</p>
					<a href="http://localhost:5050/student/verify/${data.token}">verify now</a>
				</div>
				<div class="footer">
					<span>your account cell:01921456789</span>
					<div class="soical">
						<ul>
							<li>
								<a href="#"
									><img
										src="https://ci5.googleusercontent.com/proxy/7aY7B32lkt9WeOxFD65BHL9qWln9ompVmUY1CinHXak4f5zwyc_MHuhcgftLEp08KCoi7eyyI80OWTjfcPT6M5LrFw2B81_I4DzS=s0-d-e1-ft#https://mybdjobs.bdjobs.com/EmailNotification/img/fb.png"
										alt=""
								/></a>
							</li>
							<li>
								<a href="#"
									><img
										src="https://ci5.googleusercontent.com/proxy/vVdwBD5rUXT3mggkK_qv_BFRBkgBh-AOzAp90vyNaTrp2rYLkBjLhbfd5UwbgYnBvIEqDHCNWNb7XZ4nXZV4QoGkF8ZY17TTvE4YkR_yDT4=s0-d-e1-ft#https://mybdjobs.bdjobs.com/EmailNotification/img/youtube.png"
										alt=""
								/></a>
							</li>
							<li>
								<a href="#"><img src="" alt="" /></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			</div>
		</div>
	</body>
</html>


        `,
	});
};
module.exports = {
	verifyedAccountMail,
};
