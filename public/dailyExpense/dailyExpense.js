document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const decodeToken = parseJwt(token);
  console.log(decodeToken);
  const response = await axios.get("http://localhost:3000/dailyExpense", {
    headers: { Authorization: token },
  });
  response.data.forEach((element) => {
    onScreenFunction(element);
  });
});

async function dailyExpense(event) {
  event.preventDefault();

  const obj = {
    amount: event.target.amount.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };

  const token = localStorage.getItem("token");
  const response = await axios.post("http://localhost:3000/dailyExpense", obj, {
    headers: { Authorization: token },
  });
  event.target.reset();
  onScreenFunction(response.data);
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

async function onScreenFunction(expense) {
  const token = localStorage.getItem("token");

  const ul2 = document.querySelector("#list");

  const li = document.createElement("li");
  li.innerHTML = `${expense.amount}  ${expense.description}  ${expense.category}`;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";

  const icon = document.createElement("span");
  icon.className = "fas fa-trash";
  icon.style.marginLeft = "5px";

  delBtn.appendChild(icon);

  delBtn.onclick = async () => {
    ul2.removeChild(li);
    await axios.delete(`http://localhost:3000/deleteExpense/${expense.id}`, {
      headers: { Authorization: token },
    });
  };

  li.appendChild(delBtn);
  ul2.appendChild(li);
}

document.getElementById('rzp-button1').onclick = async function (e) {
  const token = localStorage.getItem('token')
  const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
  console.log("hihihihihihih");
  var options =
  {
   "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
   "order_id": response.data.order.id,// For one time payment
   // This handler function will handle the success payment
   "handler": async function (response) {
      const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
           order_id: options.order_id,
           payment_id: response.razorpay_payment_id,
       }, { headers: {"Authorization" : token} })
      
      console.log(res)
       alert('You are a Premium User Now')
       document.getElementById('rzp-button1').style.visibility = "hidden"
       document.getElementById('message').innerHTML = "You are a premium user "
       localStorage.setItem('token', res.data.token)
       showLeaderboard()
   },
};
const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed', function (response){
  console.log(response)
  alert('Something went wrong')
});
}