function triggerEvent(target, eventType, eventDetail) {
  const event = new CustomEvent(eventType, {
    detail: eventDetail,
  });

  target.dispatchEvent(event);
}

function performAjaxOperation() {
  triggerEvent(document, "ajax-start", { url: "my-url" });
  setTimeout(() => {
    triggerEvent(document, "ajax-complete");
  }, 5000);
}

const button = document.getElementById("clickMe");

button.addEventListener("click", () => {
  performAjaxOperation();
});

document.addEventListener("ajax-start", (e) => {
  document.getElementById("whirlyThing").style.display = "inline-block";
});

document.addEventListener("ajax-complete", (e) => {
  document.getElementById("whirlyThing").style.display = "none";
});