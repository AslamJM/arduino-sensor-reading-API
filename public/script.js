let field1 = [];
let field2 = [];
let times1 = [];
let times2 = [];

const getData = async () => {
  const response = await fetch("api/readings/latest10");
  const readings = await response.json();

  readings.forEach((item, index) => {
    field1[index] = parseFloat(item.field1);
    field2[index] = parseFloat(item.field2);
    times1[index] = item.created_at;
    times2[index] = item.created_at;
  });
};

const graphData = async (dataSet, time, chartName) => {
  await getData();

  const ctx = document.getElementById(chartName).getContext("2d");
  const myChart = await new Chart(ctx, {
    type: "line",
    data: {
      labels: time.reverse(),
      datasets: [
        {
          label: chartName,
          data: dataSet.reverse(),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });

  setInterval(() => {
    getData();
    myChart.data.labels = time.reverse();
    myChart.data.datasets[0].data = dataSet.reverse();
    myChart.update();
  }, 5000);
};

graphData(field1, times1, "depths");
graphData(field2, times2, "rainwater");
