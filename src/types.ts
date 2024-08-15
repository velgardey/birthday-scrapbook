export interface Message {
    content: string;
    image?: string | File;
    audio?: string | File;
    initialX: number;
    initialY: number;
    color: string;
}