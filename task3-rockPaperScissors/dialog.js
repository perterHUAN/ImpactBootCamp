const showDialogBtn = document.querySelector("#showDialog");
const gestureChoose = document.querySelector("#gestureChoose");
const selectE = document.querySelector("#gestureChoose select");
const comfirmBtn = document.querySelector("#comfirmBtn");
const output = document.querySelector("#output");

showDialogBtn.addEventListener("click", (e) => {
  gestureChoose.showModal();
});

selectE.addEventListener("change", (e) => {
  comfirmBtn.value = selectE.value;
});

// comfirmBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   gestureChoose.close();
// });

gestureChoose.addEventListener("close", (e) => {
  output.innerHTML = gestureChoose.returnValue;
});
