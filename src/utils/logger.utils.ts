import { Logger } from 'tslog';
const log: Logger = new Logger();
export class Logging {



    static  logs(message: any , type: string) {
        if (type == 'info') {

            log.info(JSON.stringify(message));
        }
        else if (type == 'error') {
            log.error(JSON.stringify(message));
 }
        else {
            log.trace(JSON.stringify(message));
 }
        }
}