export type RoomsMembersType = {
    room_id: string;
    user_id: string;
    active: boolean;
    joined_at: Date;
    left_at: Date;
}