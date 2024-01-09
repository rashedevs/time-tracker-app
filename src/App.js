import "./App.css";
// import { getDatabase, ref, set } from "firebase/database";
// import { app } from "./firebase.init";
import Login from "./Pages/Login/Login";
// import { Button } from "./Pages/Login/Components";

// const db = getDatabase(app);
function App() {
  // const putData = () => {
  //   set(ref(db, "users/rashed"), {
  //     id: 1,
  //     name: "Rashed",
  //     age: 28,
  //   });
  // };
  return (
    <div className="container">
      {/* <Button onClick={putData}>Put Data</Button> */}
      <Login></Login>
    </div>
  );
}

export default App;
