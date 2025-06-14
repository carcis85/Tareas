
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
  // Creamos un objeto temporal con un ID falso negativo
  const tempId = Date.now() * -1;
  const tareaTemp: Tarea = {
    ...(this.nuevaTarea as Tarea),
    id: tempId
  };

  // Añadimos la tarea al array local inmediatamente
  this.tareas.unshift(tareaTemp);

  this.mostrarModal = false;

  this.tareasService.crearTarea(this.nuevaTarea as Omit<Tarea, 'id'>).subscribe({
    next: (tarea) => {
      // Reemplazamos la tarea temporal por la real (con ID real del backend)
      const index = this.tareas.findIndex(t => t.id === tempId);
      if (index !== -1) this.tareas[index] = tarea;
    },
    error: (err) => {
      console.error('Error al crear tarea:', err);
      // Eliminamos la tarea temporal si falló
      this.tareas = this.tareas.filter(t => t.id !== tempId);
      alert("Error al crear tarea");
    }
  });

  // Reset del formulario
  this.nuevaTarea = {
    titulo: '',
    descripcion: '',
    estado: Estado.ACTIVO,
    fecha: new Date().toISOString().split('T')[0]
  };
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
  if (!this.tareaAEliminar) return;

  const id = this.tareaAEliminar.id!;
  const tareaBackup = this.tareaAEliminar;

  // Quitamos la tarea de la lista inmediatamente
  this.tareas = this.tareas.filter(t => t.id !== id);
  this.cerrarModalEliminar();

  this.tareasService.eliminarTarea(id).subscribe({
    next: () => {
      console.log('Tarea eliminada');
    },
    error: (err) => {
      console.error('Error al eliminar tarea:', err);
      // Restauramos la tarea si falla
      this.tareas.unshift(tareaBackup);
      alert("No se pudo eliminar la tarea");
    }
  });
}

}
