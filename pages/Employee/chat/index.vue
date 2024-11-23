<template>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <div class="col-md-3 bg-light p-3 border-end">
                <h4>Frequently Asked Questions</h4>
                <ul class="list-unstyled">
                    <li class="my-2 bg-success bg-gradient text-white rounded p-1">What is your return policy?</li>
                    <li class="my-2 bg-success bg-gradient text-white rounded p-1">How do I track my order?</li>
                    <li class="my-2 bg-success bg-gradient text-white rounded p-1">Can I purchase items again?</li>
                    <!-- Add more FAQs as needed -->
                </ul>
            </div>
            <div class="col-md-9 d-flex flex-column p-3">
                <!-- <h1>Chat with ID: {{ id }}</h1> -->
                <div class="flex-grow-1 overflow-scroll mb-3" style="max-height: 80%;">
                    <div v-for="(message, index) in chatHistory.messages" :key="index" class="mb-2">
                        <div class="col-6 d-flex flex-column align-items-start justify-content-start me-auto">
                            <!-- TODO: download question mark here -->
                            <p class="mb-0"><img src="/assets/images/bulb.webp" style="border-radius: 5%; max-width: 50px;
                                max-height: 50px; background-color: darkblue" alt="logo" />
                                {{ message.question }}</p>
                        </div>

                        <div class="col-6 d-flex flex-row  ms-auto justify-content-end">
                            <p class="mb-0 me-2">{{ message.answer }} </p>
                            <img src="/assets/images/logo.png" style="border-radius: 5%; max-width: 100px;
                                max-height: 23px; background-color: darkblue" alt="logo" />
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <input v-model="newMessage" type="text" class="form-control me-2 border border-secondary"
                        placeholder="Type your message here..." @keyup.enter="sendMessage" />
                    <button class="btn btn-primary" @click="sendMessage"
                        :disabled="newMessage.trim() === ''">Send</button>

                </div>
                <!-- test chat with signalR -->
                <!-- <div class="">
                    <input v-model="question" placeholder="Enter your question" />
                    <input v-model="response" placeholder="Enter your response" />
                    <button @click="sendQuestionResponse">Send Question and Response</button>
                </div> -->
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { apiFactory } from '~/plugins/api';
const route = useRoute();
const id = route.params.id;
const chatHistory = ref({});
// const messages = ref([
//     // {
//     //     chatId: 1,
//     //     question: "What is the status of my application?",
//     //     answer: "Your application is under review.",
//     //     id: 1,
//     //     createdAt: "2024-10-30T06:11:55.5635185",
//     //     updatedAt: "2024-10-30T06:11:55.5635186"
//     // },
//     // {
//     //     chatId: 1,
//     //     question: "When will I hear back?",
//     //     answer: "You will hear back within two weeks.",
//     //     id: 2,
//     //     createdAt: "2024-10-30T06:11:55.5635188",
//     //     updatedAt: "2024-10-30T06:11:55.5635189"
//     // }
// ]);

const newMessage = ref('');

const sendMessage = () => {
    if (newMessage.value.trim() !== '') {

        let jobQueryInput = {
            text: newMessage.value,
            messages: []
        };

        // Sort messages by createdAt in descending order and take the top 5
        let sortedMessages = chatHistory.value.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        jobQueryInput.messages = sortedMessages.map(msg => ({
            question: msg.question,
            answer: msg.answer
        }));

        apiFactory.chatbotSevice.sendAQuestionToOpenAPI(jobQueryInput).then((response) => {
            let newMessageEntity = {
                chatId: 1,
                question: newMessage.value,
                answer: response.data.response.content,
                createdAt: new Date().toISOString(),
                updatedAt: "2024-10-30T06:11:55.5635191"
            };
            chatHistory.value.messages.push(newMessageEntity);
            newMessage.value = '';


            let formData = new FormData();
            formData.append('chatId', newMessageEntity.chatId);
            formData.append('question', newMessageEntity.question);
            formData.append('answer', newMessageEntity.answer);
            formData.append('createdAt', newMessageEntity.createdAt);
            formData.append('updatedAt', newMessageEntity.updatedAt);

            //insert a new message entity to the database that include the question and answer
            var addMessagePostResponse = apiFactory.employeeService.addMessage(formData);
        });

    }
};

// test chat with signalR
// Define reactive properties for connection, question, and response
const connection = ref(null);

// Lifecycle hook to start SignalR when component is mounted
onMounted(async () => {

    console.log("chat history")
    let chatHistoryQuery = await apiFactory.employeeService.getUserChatbox();
    chatHistory.value = chatHistoryQuery.data.responseData;
});

// Lifecycle hook to stop the SignalR connection before the component is destroyed
onBeforeUnmount(async () => {
    if (connection.value) {
        connection.value.stop().then(() => {
            console.log('SignalR connection closed.');
        });
    }

});

// Send question and response to the server-side SignalR hub
// const sendQuestionResponse = async () => {
//     if (question.value && response.value) {
//         try {
//             await connection.value.invoke('SendQuestionResponse', question.value, response.value);
//             console.log('Question and response sent successfully.');
//         } catch (err) {
//             console.error('Error sending data to SignalR:', err);
//         }
//     } else {
//         alert('Please fill in both the question and response fields.');
//     }
//     const data = {
//         text: "Can you tell me the answers to the previous questions?",
//         messages: [
//             {
//                 question: "What is the capital of France?",
//                 answer: "Paris"
//             },
//             {
//                 question: "What is 2 + 2?",
//                 answer: "4"
//             }
//         ]
//     };
//     let response2 = await apiFactory.chatbotSevice.sendAQuestionToOpenAPI(data)
//     console.log(response2);
//     alert(response2.data.response.content);
// };

</script>

<style scoped>
/* No additional styles needed as Bootstrap classes are used */
</style>
