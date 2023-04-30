import "./index.css";

const TransactionData = (props) => {
  const { data } = props;
  const { name, amount, month, day, Time } = data;
  return (
    <li className="listdata">
      <div className="time">
        <p>
          {month} {day}{" "}
        </p>
        <p>{Time}</p>
        <p>{name}/upi</p>
      </div>
      <div>
        <p>
          {amount} <span>Cr</span>
        </p>
      </div>
    </li>
  );
};

export default TransactionData;
