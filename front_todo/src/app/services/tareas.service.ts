import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Tarea } from '../models/tarea.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private apiUrl = 'http://localhost:8080/tareas';
  //private apiUrl = `${environment.apiUrl}/tareas`;

  private cache$?: Observable<Tarea[]>;

  constructor(private http: HttpClient) { }

  // getTareas(): Observable<Tarea[]> {
  //   return this.http.get<Tarea[]>(this.apiUrl);
  // }

  getTareas(): Observable<Tarea[]> {
  if (!this.cache$) {
    this.cache$ = this.http.get<Tarea[]>(this.apiUrl)
                           .pipe(shareReplay(1));
  }
  return this.cache$;
}

  crearTarea(tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  eliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }



}
