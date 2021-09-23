import { Logger } from 'tslog';
const log: Logger = new Logger();
export class Logging {



    static  logs(message: string, type: string) {
        if (type == 'info') {
            log.info(message);
        }
        else if (type == 'error') {
            log.error(message);
 }
        else {
            log.trace(message);
 }
        }
}