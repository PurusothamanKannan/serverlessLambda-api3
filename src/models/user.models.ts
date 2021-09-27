export class UsersModel {

    id: string;
    status: string;
    date: string;
    compliantStatus: string;
    userName: string;

    constructor (data: any ) {
       this.id = data.id;
       this.status = data.status;
       this.userName = data.userName;
       this.date = data.date;
       this.compliantStatus = data.compliantStatus;
    }
}