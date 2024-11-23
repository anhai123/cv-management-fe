<template>
    <div>
        <video ref="localVideo" autoplay playsinline></video>
        <video ref="remoteVideo" autoplay playsinline></video>
        <button @click="startCall">Start Call</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import * as signalR from "@microsoft/signalr";
import port from "~/service/Base/http";
import { UserInformationLocal } from "~/service/userInformationLocal";

// Define refs and reactive variables
const localVideo = ref(null);
const remoteVideo = ref(null);
const userPeerEmail = ref(null);
let connection = null;
let peerConnection = null;
let localStream = null;

onBeforeMount(() => {
    console.log(localStorage.getItem("token"))
    let token = localStorage.getItem("token");
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${port.RTC_HUB}`, {
            accessTokenFactory: async () => {

                return token
            },
        })
        .build();

    connection.on("ReceiveOffer", handleOffer);
    connection.on("ReceiveAnswer", handleAnswer);
    connection.on("ReceiveIceCandidate", handleIceCandidate);

    connection.start().catch((error) => {
        console.error(error);
    });
    console.log("SignalR connection started.");
});
// Define methods
async function startCall() {
    userPeerEmail.value = prompt("Enter the peer ID of the user you'd like to call:");
    // Initialize SignalR connection


    // Set up WebRTC peer connection
    peerConnection = new RTCPeerConnection();
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            connection.invoke("SendIceCandidate", userPeerEmail.value, JSON.stringify(event.candidate));
        }
    };
    peerConnection.ontrack = (event) => {
        console.log("Received remote stream");
        remoteVideo.value.srcObject = event.streams[0];
    };

    // Get user media
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localVideo.value.srcObject = localStream;
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    // Create offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    connection.invoke("SendOffer", userPeerEmail.value, JSON.stringify(offer));
}

async function handleOffer(offer, emailUserNeedToSendAnswer) {
    console.log("Received offer");
    await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    connection.invoke("SendAnswer", emailUserNeedToSendAnswer, JSON.stringify(answer));
}

async function handleAnswer(answer) {
    console.log("Received answer");
    await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
}

async function handleIceCandidate(candidate) {
    console.log("Received IceCandidate");
    await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
}
</script>

<style scoped>
video {
    width: 300px;
    margin: 10px;
}
</style>
