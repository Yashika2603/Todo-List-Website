const fs = require("fs"); //importing fs(file system) module from node modules
const path = require("path");
let file = path.join(__dirname, "..", "Data", "script.js"); //importing data file from path.join by giving directory name of "../Data/script.js" as file variable
class todo {
  //making a class to export all crud functions
  static gettodo() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        file,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) return reject(err.message);
          resolve(JSON.parse(data));
        }
      );
    });
  }
  static addtodo(value) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        file,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) return reject(err.message);
          if (data.length == 0) {
            data = [];
          } else {
            data = JSON.parse(data);
          }
          if (value.length != 0) {
            data.push(value);
            fs.writeFile(file, JSON.stringify(data), (err) => {
              if (err) return reject(err.message);
              resolve("Task Added Successfully");
            });
          }
        }
      );
    });
  }
  static edittodo(index, newTask) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        file,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) return reject(err.message);
          const tasks = JSON.parse(data);
          tasks[index] = newTask;
          fs.writeFile(file, JSON.stringify(tasks), (err) => {
            if (err) return reject(err.message);
            resolve("Task Updated Successfully");
          });
        }
      );
    });
  }
  static deletetodo(index) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        file,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) return reject(err.message);
          const tasks = JSON.parse(data);
          tasks.splice(index, 1);
          fs.writeFile(file, JSON.stringify(tasks), (err) => {
            if (err) return reject(err.message);
            resolve("Task Deleted Successfully");
          });
        }
      );
    });
  }
  static deleteall(){
    return new Promise((resolve, reject) => {
      fs.readFile(
        file,
        {
          encoding:"utf-8"
        },
        (err, data) => {
          if (err) return reject(err.message);
          const tasks = [];
          fs.writeFile(file, JSON.stringify(tasks), (err) => {
            if (err) return reject(err.message);
            resolve("All Tasks Cleared");
          });
        }
      )
    })
  }
}

module.exports = todo;
