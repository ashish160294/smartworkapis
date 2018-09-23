import * as nodemailer from 'nodemailer';

export function mailReceipient(email, data) {
    return new Promise((resolve, reject) => {
        nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        if(err) {
            console.log(err)
        } else {
            let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: 'ashish160294@gmail.com', // sender address
            to: 'ashishg160294@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({
                    error,
                    'message': 'Error occured whole sending email'
                })
            } else {
                resolve();
            }
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
    });
});
}