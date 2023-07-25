if (navigator.geolocation) { //check if geolocation is available
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
    });   
}
const mensajes = document.getElementById("mensajes")
const respuestas = document.getElementById("respuestas")
const miWebSocket = new WebSocket("ws://localhost:8080");

miWebSocket.addEventListener("open", () => {
  console.log("WebSocket abierto");
})

miWebSocket.addEventListener("message", async evento => {
  console.log('WebSocket ha recibido un mensaje');
  const mensaje_recibido = await evento.data;
  console.log(mensaje_recibido);
  respuestas.innerHTML = respuestas.innerHTML.concat(mensaje_recibido, "<br>");
})

miWebSocket.addEventListener("error", evento =>{
  console.log("Hubo un error: ", evento);
})

miWebSocket.addEventListener("close", () => {
  console.log('WebSocket cerrado');
})

mensajes.addEventListener("keypress", evento => {
  if(evento.code === "Enter"){
    miWebSocket.send(mensajes.value);
    mensajes.value = "";
  }
})