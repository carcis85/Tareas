
import { Component, OnInit } from '@angular/core';
import { Tarea, Estado } from '../../models/tarea.model';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})

export class TareasListComponent implements OnInit {
  tareas: Tarea[] = [];

  // Declaración única y válida
  nuevaTarea: Partial<Tarea> = {
    titulo: '',
    descripcion: '',
    estado: Estado.ACTIVO,
    fecha: new Date().toISOString().split('T')[0]
  };

  mostrarModal: boolean = false;

  tareaAEliminar: Tarea | null = null;

  constructor(private tareasService: TareasService) { }

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

  abrirModal() {
    this.nuevaTarea = {
      titulo: '',
      descripcion: '',
      estado: Estado.ACTIVO,
      fecha: new Date().toISOString().split('T')[0]
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  crearTarea() {
    console.log('Tarea a crear:', this.nuevaTarea);

    // this.tareasService.crearTarea(this.nuevaTarea).subscribe({
    this.tareasService.crearTarea(this.nuevaTarea as Omit<Tarea, 'id'>).subscribe({
      next: (tarea) => {
        this.tareas.push(tarea);
        this.nuevaTarea = {
          titulo: '',
          descripcion: '',
          estado: Estado.ACTIVO,
          fecha: new Date().toISOString().split('T')[0]
        };
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al crear tarea', err);
      }
    });
  }


  mostrarModalEliminar = false;

  abrirModalEliminar(tarea: Tarea) {
    console.log('Tarea a eliminar:', tarea);
    this.tareaAEliminar = tarea;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.tareaAEliminar = null;
  }

  confirmarEliminarTarea() {
    console.log('Confirmando eliminación de:', this.tareaAEliminar);
    if (!this.tareaAEliminar) return;

    this.tareasService.eliminarTarea(this.tareaAEliminar.id!).subscribe({
      next: () => {
        this.tareas = this.tareas.filter(t => t.id !== this.tareaAEliminar!.id);
        this.cerrarModalEliminar();
      },
      error: err => {
        console.error('Error al eliminar tarea:', err);
        this.cerrarModalEliminar();
      }
    });
  }

}
