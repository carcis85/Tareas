import { Component, Input } from '@angular/core';
import { Estado, Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {

  @Input() tarea!: Tarea;

  getEstadoColor(estado: Estado): string {
    switch (estado) {
      case Estado.COMPLETADO:
        return 'bg-green-500';
      case Estado.ACTIVO:
        return 'bg-blue-500';
      case Estado.PENDIENTE:
        return 'bg-yellow-500';
      case Estado.BLOQUEADO:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

}
