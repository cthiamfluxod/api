import { MailerService } from "@nestjs-modules/mailer";
import { Controller, Get, Query } from "@nestjs/common";

@Controller('mail')
export class MailController {
    constructor(private mailService: MailerService) {}
    @Get('plain-text-email')
    async plainTextEmail(@Query('toemail') toemail){
        await this.mailService.sendMail({
            to: toemail,
            from: 'cheikhthiam95g@gmail.com',
            text: 'Please enter your email address here     and try again.'
        })

        return 'Sent Mail';
    }
}
