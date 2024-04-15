import EventsMaster from "../../repo/eventsMaster";
import DBControllerFactory from "../../Factory/DBControllerFactory";
import { EventAttendee } from "../../types/DBTypes";

const createEventOutput = {
  status: 201,
  event_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
};

const getHostEventsOutput = {
  status: 200,
  data: [
    {
      event_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      host_id: "host_id",
      title: "Event Title",
      description: "Event Description",
      location: "Event Location",
      date_and_time: "2024-04-14T12:00:00Z",
    },
  ],
};

const getAllEventsOutput = {
  status: 200,
  data: [
    {
      event_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      host_id: "host_id",
      title: "Event Title",
      description: "Event Description",
      location: "Event Location",
      date_and_time: "2024-04-14T12:00:00Z",
    },
  ],
};

const registerAttendeeOutput = {
  status: 200,
  event_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
  attendee_id: "attendee_id",
};

const getAttendeeEventsOutput = {
  status: 200,
  data: [
    {
      event_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      host_id: "host_id",
      title: "Event Title",
      description: "Event Description",
      location: "Event Location",
      date_and_time: "2024-04-14T12:00:00Z",
    },
  ],
};

const getAttendeeListOutput: { status: number; data: EventAttendee[]; } = {
  status: 200,
  data: [
    {
      attendee_id: "attendee_id",
      attendee_name: "smth",
      attendee_profile_picture: "image.jpg"
    },
  ],
};

const factoryMockSpy = jest
  .spyOn(DBControllerFactory, "createInstance")
  .mockImplementation(() => ({
    initialize: jest.fn(),
    populate: jest.fn(),
    recordExists: jest.fn(),
    createNewPublicUser: jest.fn(),
    getPublicUser: jest.fn(),
    createNewEmployee: jest.fn(),
    getEmployee: jest.fn(),
    getAllEmployees: jest.fn(),
    createNewProperty: jest.fn(),
    getProperty: jest.fn(),
    getAllProperties: jest.fn(),
    createNewUnit: jest.fn(),
    getUnit: jest.fn(),
    getOccupiedUnit: jest.fn(),
    getAllUnits: jest.fn(),
    createNewPost: jest.fn(),
    getAllUserPosts: jest.fn(),
    getAllPostsReplies: jest.fn(),
    getAllPropertyPosts: jest.fn(),
    createNewRequest: jest.fn(),
    getRequest: jest.fn(),
    getAllEmployeeRequests: jest.fn(),
    getAllUnitRequests: jest.fn(),
    createNewEvent: jest.fn(() => Promise.resolve(createEventOutput)),
    getAllEvents: jest.fn(() => Promise.resolve(getAllEventsOutput)),
    getHostEvents: jest.fn(() => Promise.resolve(getHostEventsOutput)),
    registerNewAttendee: jest.fn(() => Promise.resolve(registerAttendeeOutput)),
    getAttendeeEvents: jest.fn(() => Promise.resolve(getAttendeeEventsOutput)),
    getAttendeeList: jest.fn(() => Promise.resolve(getAttendeeListOutput)),
    close: jest.fn(),
  }));

describe("EventsMaster", () => {
  let eventsController: EventsMaster;

  beforeEach(() => {
    eventsController = new EventsMaster();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewEvent", () => {
    it("creates a new event successfully", async () => {
      const eventData = {
        host_id: "host_id",
        title: "Event Title",
        description: "Event Description",
        location: "Event Location",
        date_and_time: "2024-04-14T12:00:00Z",
      };

      const result = await eventsController.createNewEvent(eventData);
      expect(result).toEqual(createEventOutput);
      expect(eventsController.dbController.createNewEvent).toHaveBeenCalledWith(
        eventData
      );
    });
  });

  describe("getHostEvents", () => {
    it("retrieves host events successfully", async () => {
      const hostId = "host_id";

      const result = await eventsController.getHostEvents(hostId);
      expect(result).toEqual(getHostEventsOutput);
      expect(eventsController.dbController.getHostEvents).toHaveBeenCalledWith(
        hostId
      );
    });
  });

  describe("getAllEvents", () => {
    it("retrieves all events successfully", async () => {
      const result = await eventsController.getAllEvents();
      expect(result).toEqual(getAllEventsOutput);
      expect(eventsController.dbController.getAllEvents).toHaveBeenCalled();
    });
  });

  describe("registerNewAttendee", () => {
    it("registers a new attendee successfully", async () => {
      const eventId = "event_id";
      const attendeeId = "attendee_id";

      const result = await eventsController.registerNewAttendee(
        eventId,
        attendeeId
      );
      expect(result).toEqual(registerAttendeeOutput);
      expect(
        eventsController.dbController.registerNewAttendee
      ).toHaveBeenCalledWith(eventId, attendeeId);
    });
  });

  describe("getAttendeeEvents", () => {
    it("retrieves attendee events successfully", async () => {
      const attendeeId = "attendee_id";

      const result = await eventsController.getAttendeeEvents(attendeeId);
      expect(result).toEqual(getAttendeeEventsOutput);
      expect(
        eventsController.dbController.getAttendeeEvents
      ).toHaveBeenCalledWith(attendeeId);
    });
  });

  describe("getAttendeeList", () => {
    it("retrieves attendee list successfully", async () => {
      const eventId = "event_id";

      const result = await eventsController.getAttendeeList(eventId);
      expect(result).toEqual(getAttendeeListOutput);
      expect(eventsController.dbController.getAttendeeList).toHaveBeenCalledWith(
        eventId
      );
    });
  });
});
