import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [transactionType, setTransactionType] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = "http://localhost:4040/api/transactions";
    const response = await fetch(url);
    const transactions = await response.json();
    return transactions.sort(
      (a, b) => new Date(b.datetime) - new Date(a.datetime)
    );
  }

  function addNewTransaction(e) {
    e.preventDefault();
    // const url = (process.env.REACT_APP_API_URL + "/transaction");
    const url = "http://localhost:4040/api/transaction";
    console.log(url);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transactionType,
        price,
        name,
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setTransactionType("");
        setPrice("");
        setName("");
        setDatetime("");
        setDescription("");
        console.log("result", json);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance +=
      transaction.transactionType === "gained"
        ? +transaction.price
        : -transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <main>
      <h1>
        ${balance}
        <span>.{fraction || "00"}</span>
      </h1>
      <div className="card">
        <form action="" onSubmit={addNewTransaction}>
          <div className="transType">
            <input
              type="radio"
              id="gained"
              name="transactionType"
              value="gained"
              checked={transactionType === "gained"}
              onChange={() => setTransactionType("gained")}
            />
            <label htmlFor="gained">Gained</label>
            <input
              type="radio"
              id="spent"
              name="transactionType"
              value="spent"
              checked={transactionType === "spent"}
              onChange={() => setTransactionType("spent")}
            />
            <label htmlFor="spent">Spent</label>
          </div>
          <div className="input">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required="required"
            />
            <span className="price">Price</span>
          </div>
          <div className="input">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required="required"
            />
            <span className="name">Name</span>
          </div>
          <div className="input">
            <input
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              type="datetime-local"
              required="required"
            />
          </div>
          <div className="input">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required="required"
            />
            <span>Description</span>
          </div>
          <button type="submit">Add new transaction</button>
        </form>
        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <div key={index} className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  {/* console.log(transaction.price); */}
                  <div
                    className={
                      "price " +
                      (transaction.transactionType === "gained"
                        ? "green"
                        : "red")
                    }
                  >
                    {transaction.transactionType === "spent" ? "-" : ""}$
                    {transaction.price}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
