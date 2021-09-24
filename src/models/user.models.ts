export class UsersModel {

    id: string;
    status: string;
    date: string;
    complainStatus: string;
    userName: string;

    constructor (id: string, status: string, date: string, complainStatus: string, userName: string ) {
       this.id = id;
       this.status = status;
       this.userName = userName;
       this.date = date;
       this.complainStatus = complainStatus;
    }
}