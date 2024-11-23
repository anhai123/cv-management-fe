import type { BaseDTO } from './BaseDTO';

export interface MessageDTO extends BaseDTO {
    chatId: number;
    question: string;
    answer: string;
}

export interface ChatDTO extends BaseDTO {
    appUserId: string;
    messages?: MessageDTO[];
}
