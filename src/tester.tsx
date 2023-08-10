import axios from "axios";

type item = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

let dataArray: item[];
console.log("jiiiiiiiiiii");
async function apiCalls(x: number) {
  while (dataArray.length <= x) {
    let randomId = Math.floor(Math.random() * 1100 + 1);
    let data = "error";
    try {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${randomId}`
      );
      let data = response.data;
      dataArray.push(data);
      console.log(dataArray);
    } catch (error) {
      console.log(error);
    }
  }
}

apiCalls(3);
