

export enum Estado {
  ACTIVO = 'ACTIVO',
  PENDIENTE = 'PENDIENTE',
  BLOQUEADO = 'BLOQUEADO',
  COMPLETADO = 'COMPLETADO'
}



export interface Tarea{
  id?: number;
  titulo: string;
  fecha: string;
  estado: Estado;
  descripcion?: string;
}


