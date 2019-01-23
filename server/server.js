import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config/config.json';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || config.serverPort;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'formsenderio@gmail.com',
        pass: 'formsender'
    }
});

app.set("view options", { layout: false });
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {

});


app.get('/email', (req, res) => {
		const mailOptions = {
			from: 'fediyenko.a@d2.digital',
			to: 'felseror@gmail.com',
			subject: 'Formsender io (ykondrat)',
			html: `
			<table  style="background-color: #fffff; max-width: 500px; margin:0 auto; padding:0" width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
			<tr>
				<td>
					<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td>
								<img src="https://stage.smile-baby.asp-win.d2.digital/dist-smile-baby/img/main-logo.png" alt="" width="130" style="display: block; padding: 35px 30px;" >
								</td>
							<td align="center"> 
									
								<a href=""> 
										<img src="/dist-smile-baby/img/fb-icon.jpg" alt="" border="0" width="31" height="31" style="display: block">
								</a>
							</td>
							<td align="center" >
								<a href="">
										<img src="/dist-smile-baby/img/inst-ic.jpg" alt="" border="0" width="31" height="31" style="display: block">
								</a>
							</td>		
						</tr>
					</table>
				</td>
			</tr>
			<tr bgcolor="#ec76ac">
				<td width="100%" style="color: #ffffff; font-size: 40px; padding: 50px 30px; font-weight: 400;  text-transform: uppercase; background-image: url(/dist-smile-baby/img/pattern/pattern-1.png);background-repeat: no-repeat; background-size: 100%;">Кирилл, спасибо за регистрацию!</td>
			
			</tr>
			<tr>
				<td style="color: #9594A0; padding: 30px; line-height: 24px; " >Для активации вашей учетной записи, пожалуйста, подтвердите свой электронный адрес.</td>
			</tr>
			<tr>
				<td>
					<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
						<tr>
							<td align="center">
								<table border="0" cellpadding="0" cellspacing="0">
									<tr>
										<td style="padding-left: 30px; padding-bottom: 50px"> <a href="" target="_blank"><img src="/dist/images/Btn-main.png" alt=""></a> </td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="padding-left: 30px; padding-bottom: 50px">
					<span style="line-height: 24px; color: #9AA6AE;">С наилучшими пожеланиями,<br> команда <a href="" class="link">Novita</a></span>
				</td>
			</tr>
		</table>
					`
	};
	transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
					console.log(error);
					res.status(400).send({ text : "OMG" });
			} else {
					console.log('Email sent: ' + info.response);
					res.status(200).send({ text : "OK" });
			}
	});
});

app.listen(port, function(){
    console.log(`Server listening on port: ${port}`);
});
