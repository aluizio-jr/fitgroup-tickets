import { IMailProvider, IMessage } from '../IMailProvider'

export class NodeMailerMailProvider implements IMailProvider {
    async sendMail(message: IMessage): Promise<void>{
        
    }
}