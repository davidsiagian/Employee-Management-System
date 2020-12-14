export class Alert {
    type: AlertType;
    message: string;
    alertId: string;
    keepAfterRouteChange: boolean;

    constructor(init?:Partial<Alert>) {
        this.type = AlertType.Success
        this.message = ''
        this.alertId = ''
        this.keepAfterRouteChange = false
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}