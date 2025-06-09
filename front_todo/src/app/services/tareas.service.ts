import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  // private apiUrl = 'http://localhost:8080/tareas';
  private apiUrl = `${environment.apiUrl}/tareas`;


  constructor(private http: HttpClient) { }

  getTareas(): Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  crearTarea(tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }


}
