import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

// const promise2 = axios.get("http://localhost:3001/persons");
// console.log(promise2);

// axios.get("http://localhost:3001/persons").then((response) => {
//     const notes = response.data;
//     console.log(notes);
// });

// axios.get("http://localhost:3001/persons").then((response) => {
//     const notes = response.data;
//     ReactDOM.createRoot(document.getElementById("root")).render(<App notes={notes} />);
// });
