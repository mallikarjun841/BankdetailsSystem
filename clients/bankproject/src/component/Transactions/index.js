import { Link } from "react-router-dom";
import "./index.css";
import { v4 as uuid } from "uuid";
import Popup from "reactjs-popup";
import { useState } from "react";
import Header from "../Header";
import TransactionData from "../TransactionData";
import { useGlobalContext } from "../contextData";

const Home = (props) => {
  const [Details, setDetatils] = useState({
    name: "",
    amount: "",
    temp: "",
    withdraw: 0,
  });

  const [transactionList, setList] = useGlobalContext();
  console.log(transactionList);
  const { name, amount, temp, withdraw } = Details;

  let totalamount = 0;

  console.log(transactionList);
  if (transactionList.length !== 0) {
    transactionList.forEach((element) => {
      totalamount += parseInt(element.amount);
    });
  }

  const updatewithdraw = (event) => {
    setDetatils((object) => ({
      ...object,
      temp: parseInt(event.target.value),
    }));
  };

  const submitWithdrawDetails = (event) => {
    event.preventDefault();
    setDetatils((object) => ({
      ...object,
      withdraw: parseInt(object.withdraw) + parseInt(object.temp),
    }));
  };

  const months = [
    "Jan",
    "Feb",
    "mar",
    "Apr",
    "May",
    "Jun",
    "jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const presentdate = new Date();
  console.log(presentdate.getDate());

  const submitDespostorDetails = (event) => {
    event.preventDefault();
    setList((object) => [
      ...transactionList,
      {
        id: uuid(),
        name,
        amount,
        month: months[presentdate.getMonth()],
        day: presentdate.getDate(),
        Time: `${presentdate.getHours()}:${presentdate.getMinutes()}`,
      },
    ]);
    setDetatils({ name: "", amount: "" });
  };

  const updatename = (event) => {
    setDetatils((object) => ({ ...object, name: event.target.value }));
  };
  const updateamount = (event) => {
    setDetatils((object) => ({ ...object, amount: event.target.value }));
  };

  console.log(typeof withdraw);
  console.log(withdraw);
  console.log(typeof totalamount);
  console.log(totalamount);

  return (
    <>
      <Header />
      <div className="homecontainer">
        <div className="subhomecontainer">
          <div className="buttoncontainer">
            <h1>Transactions</h1>
            <div>
              <Popup
                modal
                trigger={<button className="findjobbutton">Desposit</button>}
                className="popup-content"
              >
                {(close) => (
                  <div className="popmaincontainer">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <p>Despositor Details</p>
                    <form
                      onSubmit={submitDespostorDetails}
                      className="inputcontainer"
                    >
                      <input
                        value={name}
                        onChange={updatename}
                        className="input"
                        type="text"
                        placeholder="Enter Name"
                        required
                      />
                      <input
                        value={amount}
                        onChange={updateamount}
                        className="input"
                        type="text"
                        placeholder="Enter Amount"
                        required
                      />
                      <button type="sumbit">Confirm</button>
                    </form>
                  </div>
                )}
              </Popup>
              <Popup
                modal
                trigger={<button className="findjobbutton">Withdraw</button>}
                className="popup-content"
              >
                {(close) => (
                  <div className="popmaincontainer">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <p>withdraw Details</p>
                    <form
                      onSubmit={submitWithdrawDetails}
                      className="inputcontainer"
                    >
                      <input
                        value={temp}
                        onChange={updatewithdraw}
                        className="input"
                        type="text"
                        placeholder="Enter Amount"
                        required
                      />
                      <button type="sumbit">Confirm</button>
                    </form>
                  </div>
                )}
              </Popup>
              {/* <button className="findjobbutton">Deposit</button>
              <button className="findjobbutton">Withdraw</button> */}
            </div>
          </div>

          <h1>
            Amount: Rs. <span>{totalamount}</span> /-
          </h1>

          <ul className="transaction-container">
            <p>Transaction Details</p>
            {transactionList.map((object) => (
              <TransactionData key={object.key} data={object} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
