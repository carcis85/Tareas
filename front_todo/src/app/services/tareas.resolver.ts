// src/app/services/tareas.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TareasService } from './tareas.service';
import { Tarea } from '../models/tarea.model';

@Injectable({ providedIn: 'root' })
export class TareasResolver implements Resolve<Tarea[]> {
  constructor(private tareasService: TareasService) {}

  resolve(): Observable<Tarea[]> {
    return this.tareasService.getTareas();
  }
}
