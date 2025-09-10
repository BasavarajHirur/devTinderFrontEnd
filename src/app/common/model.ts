export interface chatList {
    chatId: string;
    participants: Participant[];
    lastMessage: any;
}

export interface Participant {
    _id: string;
    firstName: string;
    lastName: string;
}