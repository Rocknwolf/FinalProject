import mailer from "nodemailer";
import { htmlToText } from "nodemailer-html-to-text";
import fs from "file-system";
import promises from "dns";
import Mail from "nodemailer/lib/mailer";



const config = {
	transporter: {
		pool: true,
		host: process.env.MAIL_HOST,
		port: +process.env.MAIL_PORT,
		secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	},
	from: process.env.MAIL_FROM,
	retry: 3,
};


const _loadMailTemplate = async (mailType) =>{
	return new Promise((resolve,reject)=>{
		fs.readFile(path.join(__dirname + `./mailer/${mailType}.html`),'utf8', (error,htmlString)=>{
			if(!error && html){
				resolve(htmlString)
			} else{
				reject(error)
			}
		})
	})
	//await fs.promises.readFile(`./mailer/${mailType}.html`, "utf8");
}

const _renderMail = async ({ template, vars }) => {
	let mailBody = template;
	Object.keys(vars).map((key) => {
		const replace = new RegExp(`{{{${key}}}}`,"g");
		mailBody = mailBody.replace(replace, vars[key]);
	});
	return mailBody;
};

const _processMail = async => {
	return new Promise((resolve, reject) => {
		const transporter = mailer.createTransport({ ...config.transporter });
		transporter.use("compile", htmlToText({ tags: { img: { format: "skip" } } }));

		transporter.sendMail(
			{
				from: config.from,
				to: recipients.join("; "),
				subject: subject || "No Subject",
				html: html,
			},
			async (error) => {
				transporter.close();

				if (error !== null) {
					if (failureCounter >= retry) return reject(error);

					await new Promise((resolve) => setTimeout(resolve, 3000));
					return _processMail({
						subject,
						recipients,
						html,
						failureCounter,
						retry: retry + 1,
						callback: resolve,
					});
				}

				if (callback) await callback();
				return resolve(null);
			}
		);
	});
};

const sendMail = async ({ recipients = [], mailType, subject, vars = {} }) => {
	if (recipients.length < 1) throw new Error("no recipients");
	if (!mailType) throw new Error("no mailType");
	if (!subject) throw new Error("no subject");

	try {
		const template = await _loadMailTemplate(mailType);
		const html = await _renderMail({ template, vars });
		await _processMail({ subject, recipients, html, retry: config.retry });
	} catch (error) {
		console.log(error);
	}
};

export default sendMail;
