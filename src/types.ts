export interface Message {
    id: string;
    content: string;
    image?: string | File;
    audio?: string | File;
    initialX: number;
    initialY: number;
    color: string;
    reactions: { [emoji: string]: number };
    comments: Comment[];
}

export interface Comment {
    id: string;
    content: string;
    timestamp: number;
}