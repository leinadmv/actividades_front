import { Actividad } from "./actividad.model";

export class Empleado {

    id?: number;
    nombre?: string;
    apellido?: string;
    documento?: string;
    actividades?: Actividad[];

}