const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.textContent = `${transaction.text}: ${sign}₹${Math.abs(transaction.amount)}`;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((a, b) => a + b, 0).toFixed(2);
  const income = amounts.filter((a) => a > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const expense = (
    amounts.filter((a) => a < 0).reduce((a, b) => a + b, 0) * -1
  ).toFixed(2);

  balance.innerText = `₹${total}`;
  money_plus.innerText = `+₹${income}`;
  money_minus.innerText = `-₹${expense}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter both description and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();

  text.value = "";
  amount.value = "";
});
