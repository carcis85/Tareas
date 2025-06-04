export enum Estado{
  ACTIVO = 'ACTIVO',
  EN_ESPERA = 'PENDIENTE',
  BLOQUEADO = 'BLOQUEADO',
  CERRADO = 'COMPLETADO'
}



export interface Tarea{
  id: number;
  titulo: string;
  fecha: string;
  estado: Estado;
  descripcion?: string;
}
