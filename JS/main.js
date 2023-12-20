const form = document.querySelector(".form");
const box = document.querySelector(".box");
const inputs = document.querySelectorAll(".inputs");
const modal = document.querySelector(".modal");
const form2 = document.querySelector(".form2");
const inputs2 = document.querySelectorAll(".inputs2");

let data = [];

const render = () => {
  box.innerHTML = data
    ?.map(
      (item) => `
    <div class="card">
      <h1>${item.user_name}</h1>
      <p>${item.last_name}</p>
      <p>${item.des}</p>
      <button data-delete="${item.id}">delete</button>
      <button data-edit="${item.id}">edit</button>
    </div>
  `
    )
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {};
  for (let i of inputs) {
    obj[i.name] = i.value;
    i.value = "";
  }
  data.push({ ...obj, id: Date.now() });
  render();
});

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  let elId = Number(modal.id);
  let obj = {};
  for (let i of inputs2) {
    obj[i.name] = i.value;
    i.value = "";
  }
  data = data.map((item) => (item.id === elId ? { ...obj, id: elId } : item));
  modal.style.display = "none";
  render();
});

box.addEventListener("click", (e) => {
  let deleteItem = Number(e.target.dataset.delete);
  let editItem = Number(e.target.dataset.edit);

  if (deleteItem) {
    data = data.filter((item) => item.id !== deleteItem);
  }
  if (editItem) {
    modal.style.display = "flex";
    modal.id = editItem;
    let item = data.find((item) => item.id === editItem);
    for (let i of inputs2) {
      i.value = item[i.name];
    }
  }
  render();
});
