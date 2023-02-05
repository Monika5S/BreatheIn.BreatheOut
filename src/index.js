function hideBubble() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".circle").style.display = "none";
  document.querySelector(".yoga-pose").style.display = "block";
}

function startActivity() {
  document.querySelector(".yoga-pose").style.display = "none";
  document.querySelector(".container").style.display = "block";
  document.querySelector(".circle").style.display = "block";
  startTime = new Date();
}

function updateChart() {
  endTime = new Date();
  let timeTaken = endTime.getTime() - startTime.getTime();
  timeData.push(timeTaken / 1000);
  chart.data.labels.push("");
  chart.update();
  hideBubble();
}

function showActivity(response) {
  let data = response.data.activities;
  let random = Math.floor(Math.random() * data.length);
  let activityObject = data[random];

  let activityContainer = document.querySelector(".activity");
  let newDiv = document.createElement("p");
  newDiv.innerHTML = `<p>📮Activity Suggestion <br> ✅ ${activityObject.suggestion} </p>
  <img src=${activityObject.gif} class="image-fluid border rounded">`;
  activityContainer.appendChild(newDiv);
}

function getActivity() {
  axios.get("./activities/activities.json").then(showActivity);
}

let endTime;
let startTime;
let timeData = [];
let chart;

chart = new Chart(document.getElementById("time-chart"), {
  type: "line",
  data: {
    labels: ["Time Taken"],
    datasets: [
      {
        label: "Time (s)",
        data: timeData,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

document.querySelector(".btn-primary").addEventListener("click", startActivity);

document.querySelector(".btn-danger").addEventListener("click", updateChart);

document.querySelector(
  ".bubble"
).innerHTML = `<div class="container justify-content-center">
<div id="start" class="circle"></div>
</div>`;
hideBubble();
getActivity();
