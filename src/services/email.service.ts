import nodemailer from 'nodemailer';
import pug from 'pug';

import { config } from '../configs';
import { logger } from '../utils';

export interface Message {
  from: string;
  to: string;
  subject: string;
  html?: string;
}

export interface SendEmailOptions {
  subject: string;
  receiver: {
    name?: string;
    email: string;
  };
  context?: Record<string, any>;
}

export const transport = nodemailer.createTransport(config.email.smtp);

/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env')
    );
}

export const sendEmail = async (emailData: SendEmailOptions, pugTemplatePath: string): Promise<void> => {
  // Compile a Pug template from a file to a function
  const compiledFunction = pug.compileFile(pugTemplatePath);
  // Render the function
  const emailHTML = compiledFunction(emailData);
  const msg: Message = {
    from: config.email.from,
    to: emailData.receiver.email,
    subject: emailData.subject,
    // send the email as an html
    html: emailHTML,
  };
  await transport.sendMail(msg);
};
