import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eye");

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";
      body.style.opacity = event.data.state ? "1" : "0";
      eye.classList.remove("interaction");
      return (eye.innerHTML = `<i class="fa-solid fa-o"></i>`);
    }

    case "leftTarget": {
      eye.classList.remove("interaction");
      return (eye.innerHTML = `<i class="fa-solid fa-o"></i>`);
    }

    case "setTarget": {
      // eye.classList.add("eye-hover");
      eye.innerHTML = `<i class="fa-regular fa-comment"></i>`;

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            if (data.targetIcon) {
              eye.innerHTML = `<i class="${data.targetIcon}"></i>`;
            } else {
              createOptions(type, data, id + 1);
            }
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            if (data.targetIcon) {
              eye.innerHTML = `<i class="${data.targetIcon}"></i>`;
            } else {
              createOptions("zones", data, id + 1, i + 1);
            }
          });
        }
      }

      eye.classList.add("interaction");
    }
  }
});
