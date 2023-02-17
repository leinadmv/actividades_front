import { Empleado } from "./empleado.model";

export class Actividad {

    /**
     * id de la actividad
     */
    id?: number;
    /**
     * nombre de la actividad
     */
    nombre?: string;
    /**
     * descripcion de la actividad
     */
    descripcion?: string;
    /**
     * fecha estimada de terminacion de la actividad
     */
    fechaEstimada?: Date;
    /**
     * Estado de la actividad 1 para realizado 0 para pendiente
     */
    estado?: boolean;
    /**
     * cantidad de dias de retraso de la actividad
     */
    diasRetraso?: number;
    /**
     * Empleado que realizara la actividad
     */
    empleado?: Empleado;

    
}