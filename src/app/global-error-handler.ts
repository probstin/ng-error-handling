import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ErrorService } from "./services/error.service";
import { LoggingService } from "./services/logging.service";
import { NotificationService } from "./services/notification.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse): void {
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;

        // server error
        if (error instanceof HttpErrorResponse) {
            message = errorService.getServerErrorMessage(error);
            notifier.showError(message);
        }
        // client error
        else {
            message = errorService.getClientErrorMessage(error);
            notifier.showError(message);
        }

        // always log errors
        logger.logError(message, stackTrace);
        console.error(error);
    }

}