// WEBSITE UNDER MAINTENANCE ALERT



// ************************************************************************
// ALERT NOTIFICATION

const alert_message = document.querySelector (".alert-message");
const alert = document.querySelector("#alert");

// alert_message.innerHTML = "This is an alert message!";

const p = document.createElement("p");
p.textContent = "Hi, This is an Alert Message.";
alert_message.appendChild(p);

const button = document.createElement("button");
button.textContent = "I know already!";
alert_message.appendChild(button);

button.onclick = function () {
    localStorage.alert_read = true;
}

alert_message.style.display = "block";
alert.style.visibility = "visible";

// ************************************************************************
// DISABLE A FEATURE COMPLETELY



// ************************************************************************
// VARIABLE INITIALIZER


// ************************************************************************
// VIEW: 
// SETTING-1: Maximized or Minimized
// SETTING-2: Light or Dark




