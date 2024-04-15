import DBController  from '../controllers/DBController';
import { EventData, EventDetails } from '../types/DBTypes';


class EventMaster {
    dbController: DBController;

    constructor(dbController: DBController) {
        this.dbController = dbController;
    }

    async createNewEvent(eventData: EventData): Promise<{ status: number; event_id?: string; message?: string }> {
        try {
            // Ensure that eventData includes 'location'
            const { host_id, title, description, location, date_and_time } = eventData;
            return await this.dbController.createNewEvent({ host_id, title, description, location, date_and_time });
        } catch (error) {
            return { status: 500, message: 'Failed to create event' };
        }
    }

    async getHostEvents(host_id: string): Promise<{ status: number; data?: EventDetails[]; message?: string }> {
        return await this.dbController.getHostEvents(host_id);
    }
}

export default EventMaster;

