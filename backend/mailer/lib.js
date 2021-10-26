import mailer from "nodemailer";
import { htmlToText } from "nodemailer-html-to-text";
import fs from "fs";
import path from "path";


const config = {
    transporter: {
        pool: true,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
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
        fs.readFile(path.join( 'mailer',`${mailType}.html`),'utf8', (error,htmlString)=>{
            if(!error && mailType){
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

const _processMail = async ({ subject, recipients, html, retry, failureCounter, callback }) => {
    return new Promise((resolve, reject) => {
        const transporter = mailer.createTransport({ ...config.transporter });
        console.log(config.transporter, transporter);
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
                    console.log(failureCounter);

                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    return _processMail({
                        subject,
                        recipients,
                        html,
                        failureCounter: failureCounter + 1,
                        retry,
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
    
    let failureCounter = 0;

    try {
        const template = await _loadMailTemplate(mailType);
        const html = await _renderMail({ template: template, vars });
        await _processMail({ subject, recipients, html, retry: config.retry, failureCounter });
    } catch (error) {
        console.log(error);
    }
};

export default sendMail;
