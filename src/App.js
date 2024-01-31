import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, description, datetime }),
    }).then((response) => {
      response.json().then(json => {
        console.log("result", json);
      });
    });
  }

  return (
    <main>
      <h1>
        $400<span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Enter expenses"}
          />

          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>

        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Enter description"}
          />
        </div>

        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">time for a new TV</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">01-30-2024</div>
          </div>
        </div>

        <div className="transaction">
          <div className="left">
            <div className="name">GST</div>
            <div className="description">time for a new TV</div>
          </div>
          <div className="right">
            <div className="price green">+$500</div>
            <div className="datetime">01-30-2024</div>
          </div>
        </div>

        <div className="transaction">
          <div className="left">
            <div className="name">New Pet</div>
            <div className="description">time for a new TV</div>
          </div>
          <div className="right">
            <div className="price red">-$67</div>
            <div className="datetime">01-30-2024</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
