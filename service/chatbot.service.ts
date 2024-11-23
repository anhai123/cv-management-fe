import { httpChatBot } from "./Base/axiousInstance"

interface Message {
    question: string;
    answer: string;  // với điều kiện min_length=1 từ Python
}

interface JobQueryInput {
    text: string;
    messages: Message[];
}

export default class ChatBotService {
    async sendAQuestionToOpenAPI(data: JobQueryInput) {
        try {
            const response = await httpChatBot.post(`process-message`, data)
            if (response == null) return null
            return response
        } catch (error: any) {
            console.log(error)
            return error.response.data
        }
    }

}
