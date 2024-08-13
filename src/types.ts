export interface Message {
    content: string;
    image?: string | File;
    initialX: number;
    initialY: number;
    color: string;
}