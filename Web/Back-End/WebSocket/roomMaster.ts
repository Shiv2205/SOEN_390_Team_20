
export class RoomMaster {
    private rooms: Map<string, Set<string>>;

    constructor() {
        this.rooms = new Map();
    }

    joinRoom(room_name: string, fullname: string) {
        if(!this.rooms.has(room_name))
            this.rooms.set(room_name, new Set<string>([fullname]));
        this.rooms.get(room_name)?.add(fullname);
    }

    getUsername(fullname: string): string {
        const [firstName, lastName] = fullname.split(' ');
        return `${firstName} ${lastName.charAt(0)}`;
    }
}