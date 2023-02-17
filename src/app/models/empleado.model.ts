import { Actividad } from "./actividad.model";

export class Empleado {

    /**
     * id del empleado
     */
    id?: number;
    /**
     * nombre del empleado
     */
    nombre?: string;
    /**
     * apellido del empleado
     */
    apellido?: string;
    /**
     * documento del empleado
     */
    documento?: string;
    /**
     * actividades que realizara el empleado
     */
    actividades?: Actividad[];

}