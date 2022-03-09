import { Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        public messageService: MessageService,
        private zone: NgZone
    ) { }

    showSuccess(message: string): void {
        this.zone.run(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
        });
    }

    showError(message: string): void {
        this.zone.run(() => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
        });
    }
    
}