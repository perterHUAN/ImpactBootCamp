const form = document.querySelector("form");
const goBack = document.querySelector(".go_back");

form.addEventListener("submit", (e) => {
  const fd = new FormData(form);
  let order = "【您的订单已经生成】\n-----------------------\n";
  const info = new Map();
  for (const e of fd) {
    const [name, val] = e;
    if (info.has(name)) info.get(name).push(val);
    else info.set(name, [val]);
  }

  const type = [
    "口味",
    "数量",
    "杯型",
    "甜度",
    "免费小料",
    "加价小料",
    "是否加冰",
    "是否去茶底",
    "地址",
    "手机号",
    "期待送达时间",
    "备注",
    "支付方式",
  ];

  for (const e of type) {
    order += `${e}:${info.has(e) ? info.get(e).join(",") : "-"}\n`;
  }
  confirm(order);
  e.preventDefault();
});

goBack.addEventListener("click", (e) => {
  window.scrollTo(0, 0);
});

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    goBack.style.display = "block";
  } else {
    goBack.style.display = "none";
  }
});
