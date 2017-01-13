export class IndexController {
    private date: Date;

    constructor() {
        this.date = new Date();
    }

    public getDate(): Date {
        return this.date;
    }
}
