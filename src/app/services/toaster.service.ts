import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToasterService{

  constructor(private messageService: MessageService) {
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: message });
  }

  error(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: message });
  }

  warning(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Aviso!', detail: message });
  }
}
