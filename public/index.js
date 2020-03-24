if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(reg => {
      console.log("Service worker registered.", reg);
    });
  });
}

$("#add-btn").on("click", event => {
  event.preventDefault();
  const newBudget = {
    transaction: $("#transaction").val(),
    amount: $("#amount").val()
  };

  $.post("/api/budget/deposit", newBudget).then(data => {
    console.log(data);
  });
});

$("#sub-btn").on("click", event => {
  event.preventDefault();
  const newBudget = {
    transaction: $("#transaction").val(),
    amount: "-" + $("#amount").val()
  };

  $.post("/api/budget/withdraw", newBudget).then(data => {
    console.log(data);
    displayData(data);
  });
});

const displayData = data => {
  $("#tbody").empty();
  let totalAmount = 0;
  for (let i = 0; i < data.length; i++) {
    let tr = $("<tr>");
    let td1 = $("<td>").text(data[i].transaction);
    let td2 = $("<td>").text(data[i].amount);
    tr.append(td1, td2);
    $("#tbody").append(tr);

    totalAmount += parseFloat(data[i].amount);
  }
  $("#total").text(totalAmount);
};

const loadData = () => {
  $.get("/api/budget").then(data => {
    displayData(data);
  });
};

loadData();
