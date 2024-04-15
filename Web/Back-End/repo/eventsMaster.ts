import DBControllerFactory from "../Factory/DBControllerFactory";
import IDBController from "../interfaces/IDBController";
import { EventData, EventDetails, EventAttendee, NotFound } from "../types/DBTypes";

class EventsMaster {
  readonly dbController: IDBController;

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  async createNewEvent({
    host_id,
    title,
    description,
    location,
    date_and_time
  }: EventData): Promise<{ status: number; event_id: string } | NotFound> {
    const result = await this.dbController.createNewEvent({
      host_id,
      title,
      description,
      location,
      date_and_time
    });

    return result;
  }

  async getHostEvents(
    host_id: string
  ): Promise<{ status: number; data: EventDetails[] } | NotFound> {
    const result = await this.dbController.getHostEvents(host_id);

    return result;
  }

  async getAllEvents(
  ): Promise<{ status: number; data: EventDetails[] } | NotFound> {
    const result = await this.dbController.getAllEvents();
    return result;
  }

  async registerNewAttendee(
    event_id: string,
    attendee_id: string
  ): Promise<{ status: number; event_id: string; attendee_id: string }> {
    const result = await this.dbController.registerNewAttendee(
      event_id,
      attendee_id
    );

    return result;
  }

  async getAttendeeEvents(
    attendee_id: string
  ): Promise<{ status: number; data: EventDetails[] } | NotFound> {
    const result = await this.dbController.getAttendeeEvents(attendee_id);

    return result;
  }

  async getAttendeeList(
    event_id: string
  ): Promise<{ status: number; data: EventAttendee[] } | NotFound> {
    const result = await this.dbController.getAttendeeList(event_id);

    return result;
  }
}

export default EventsMaster;
