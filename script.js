const transcriptEl = document.getElementById("transcript");
const statusEl = document.getElementById("status");
const app = document.querySelector(".app");

let finalText = "";
let isListening = false;

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

recognition.onend = () => {

if(isListening) recognition.start();

};

recognition.onresult = (event) => {

let interim = "";

for(let i = event.resultIndex; i < event.results.length; i++){

const text = event.results[i][0].transcript;

if(event.results[i].isFinal)
finalText += text + " ";
else
interim += text;

}

transcriptEl.innerText = finalText + interim;

};

/* START */

document.getElementById("startBtn").onclick = () => {

if(isListening) return;

recognition.start();

isListening = true;

statusEl.innerText = "Listening...";

app.classList.add("listening");

};

/* STOP */

document.getElementById("stopBtn").onclick = () => {

recognition.stop();

isListening = false;

statusEl.innerText = "Stopped";

app.classList.remove("listening");

};

/* COPY */

document.getElementById("copyBtn").onclick = () => {

navigator.clipboard.writeText(transcriptEl.innerText);

statusEl.innerText = "Copied to clipboard";

};

/* CLEAR */

document.getElementById("clearBtn").onclick = () => {

finalText = "";

transcriptEl.innerText = "Your speech will appear here...";

statusEl.innerText = "Text cleared";

};

/* PDF */

document.getElementById("pdfBtn").onclick = () => {

html2canvas(document.getElementById("capture"))
.then(canvas=>{

const imgData = canvas.toDataURL("image/png");

const { jsPDF } = window.jspdf;

const pdf = new jsPDF();

const width = pdf.internal.pageSize.getWidth();

const height = canvas.height * width / canvas.width;

pdf.addImage(imgData,"PNG",0,10,width,height);

pdf.save("VoxNote-Transcript.pdf");

});

};

/* IMAGE */

document.getElementById("imgBtn").onclick = () => {

html2canvas(document.getElementById("capture"))
.then(canvas=>{

const link = document.createElement("a");

link.download = "VoxNote-Transcript.png";

link.href = canvas.toDataURL();

link.click();

});

};