import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasListComponent } from './components/tareas-list/tareas-list.component';
import { TareasResolver } from './services/tareas.resolver';


const routes: Routes = [
  { path: '', component: TareasListComponent, resolve: { tareas: TareasResolver } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
