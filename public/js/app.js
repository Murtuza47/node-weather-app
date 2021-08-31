const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";
  if (search.value)
    fetch(`/forecast?address=${search.value}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    });
});
