import { Empleado } from "./empleado.model";

export class Actividad {

    id?: number;
    nombre?: string;
    descripcion?: string;
    fechaEstimada?: Date;
    estado?: boolean;
    diasRetraso?: number;
    empleado?: Empleado;

    
}