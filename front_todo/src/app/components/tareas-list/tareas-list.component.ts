
import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea.model';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})

export class TareasListComponent implements OnInit {
  tareas: Tarea[] = [];

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe({
      next: (datos) => {
        this.tareas = datos;
        console.log('Tareas cargadas:', this.tareas);
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      }
    });
  }
}
