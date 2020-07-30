import IMailProvider from '../models/IMailProvider';

interface IMessages {
    to: string;
    body: string;
}
export default class FakeMailProvider implements IMailProvider {
    private Messages: IMessages[] = [];
    public async sendEmail(to: string, body: string): Promise<void> {
        this.Messages.push({
            to,
            body,
        });
    }
}
