let tasklist = document.querySelector(".tasklist");
let form = document.querySelector(".addForm");
let input = document.querySelector("#taskItem");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let taskItem = input.value;
  axios
    .post("/addtodo", {
      taskItem: taskItem,
    })
    .then((data) => {
      console.log(data);
      input.value = "";
      let div = document.createElement("div");
      div.innerText = `${taskItem}`;
    });
});

function displayData(data) {
  tasklist.innerHTML = "";
  if (data.length == 0) {
    tasklist.innerHTML = "";
    tasklist.style.backgroundColor="white";
  } else {
    data.forEach((task, index) => {
      let div = document.createElement("div");
      div.className="item"
      div.innerHTML = `<span>${task}</span>
      <div>
      <button class="edit" onClick="editTask(${index})">Edit</button>
      <button class="delete" onClick="deleteTask(${index})">Delete</button>
      </div>`;
      tasklist.append(div);
    });
    let div1 = document.createElement("div");
    div1.innerHTML = `<button class="deleteall" onclick="deleteall()">Delete All Tasks</button>`;
    tasklist.append(div1);
  }
}

async function getdata(Api) {
  let data = await fetch(Api);
  let responsedata = await data.json();
  displayData(responsedata);
}

async function editTask(index) {
  const newTask = prompt("Edit task:");
  if (newTask !== null) {
    await axios.post("/edittodo", { index, newTask });
    getdata("/gettodo");
  }
}

async function deleteTask(index) {
  let ans = confirm("Are you sure you want to delete");
  if (ans == true) {
    await axios.post("/deletetodo", { index });
  }
  getdata("/gettodo");
}

async function deleteall() {
  let ans = confirm("Are you sure you want to delete all tasks");
  if (ans == true) {
    await axios.post("/deleteall");
  }
  getdata("/gettodo");
}

getdata("/gettodo");
