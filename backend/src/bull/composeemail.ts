import { getWeather } from "./elements/weather";
import { Newsletter } from "../utils/database/types";
import { getRssSummary } from "./elements/rss";

const nodemailer = require("nodemailer");
const fs = require('node:fs');


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PW, // :))))))
    },
  });


export default async function ComposeEmail(newsletter: Newsletter) {
    var emailbase = fs.readFileSync('src/bull/emailstylebase.html')

    for (let i = 0; i<newsletter.configuration.newsletter_elements.length; i++) {
        const element = newsletter.configuration.newsletter_elements[i];
        if (element.id === 'weather' && 'location' in element.settings) {
            const output = await getWeather(element.settings);
            emailbase += output 
            
        }
        else if (element.id === "rss_feed" && "site" in element.settings) {
          const output = await getRssSummary(element.settings)
          emailbase += output
        }
        
    }
    return emailbase
}

export async function sendEmail(target:string, emailName: string,content:string) {
    (async () => {
        const info = await transporter.sendMail({
          from: '"Monkey-mail" <garry44@ethereal.email>',
          to: `${target}, ${target}`,
          subject: emailName,
          html: content,
        });
        console.log("Message sent:", info.messageId);
      })();      
}