export interface ScheduledEvent{
    scheduledEventId: number;
    name: string;
    description_: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    places: number;
    modality:string;
    statusId:number;
    managerId:string;
    eventId:number;
    address: string
}