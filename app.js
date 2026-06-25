const dateEl = document.getElementById("date");
const greetingEl = document.getElementById("greeting");

// Date
const now = new Date();
dateEl.textContent = now.toDateString();

// Greeting
const hour = now.getHours();

if (hour < 12) {
  greetingEl.textContent = "Good Morning 🌷";
} else if (hour < 18) {
  greetingEl.textContent = "Good Afternoon ☀️";
} else {
  greetingEl.textContent = "Good Evening 🌙";
}
