import React from 'react';
import { Bar } from 'react-chartjs-2';
// import './App.css';

const Graph = (props) => (
  <>
    <div className="Graph">
        {/* グラフコンポーネントの呼び出し */}
        <Bar data={props.tempGraph.data} options={props.tempGraph.options} />
        <Bar data={props.pressGraph.data} options={props.pressGraph.options} />
        {/* <Bar data={props.graphData.seaLevelGraphData} options={props.graphOption} /> */}
        <Bar data={props.humidityGraph.data} options={props.humidityGraph.options} />
    </div>
  </>
);

Graph.getInitialProps = async function () {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=Yamaguchi&units=metric&APPID=${process.env.APPID}`
  );
  let data = await response.json();
  const arr = [];
  // TODO: データの加工したいときってどこでやればいいのか？
  Object.keys(data.list).map(
    (key) => (
      (data.list[key].main['id'] = key),
      (data.list[key].main['datetime'] = data.list[key].dt_txt),
      arr.push(data.list[key].main)
    )
  );
  /** グラフデータ */
  const tempGraphData = {
    labels: arr.map(function(x) {
      return [x.datetime]
    }),
    datasets: [
      {
        type: 'line', // グラフタイプを指定
        // yAxisID: 'y-axis-temp', // y軸idを指定
        data: arr.map(function(x) { return x.temp }),
        backgroundColor: random_rgba(),
        label: '気温',
      },
      {
        type: 'line', // グラフタイプを指定
        // yAxisID: 'y-axis-temp', // y軸idを指定
        data: arr.map(function(x) { return x.feels_like }),
        backgroundColor: random_rgba(),
        label: '体感気温',
      },
      {
        type: 'line', // グラフタイプを指定
        // yAxisID: 'y-axis-temp', // y軸idを指定
        data: arr.map(function(x) { return x.temp_min }),
        backgroundColor: random_rgba(),
        label: '最低気温',
      },
      {
        type: 'line', // グラフタイプを指定
        // yAxisID: 'y-axis-temp', // y軸idを指定
        data: arr.map(function(x) { return x.temp_max }),
        backgroundColor: random_rgba(),
        label: '最高気温',
      }
    ]
  };

  /** グラフデータ */
  const pressGraphData = {
    labels: arr.map(function(x) {
      return [x.datetime]
    }),
    datasets: [
      {
        type: 'line', // グラフタイプを指定
        // yAxisID: 'y-axis-pressure', // y軸idを指定
        data: arr.map(function(x) { return x.pressure }),
        backgroundColor: random_rgba(),
        label: '気圧',
      }
    ]
  };

  /** グラフデータ */
  // const seaLevelGraphData = {
  //   labels: arr.map(function(x) {
  //     return [x.datetime]
  //   }),
  //   datasets: [
  //     {
  //       type: 'line', // グラフタイプを指定
  //       yAxisID: 'y-axis-precipitation', // y軸idを指定
  //       data: arr.map(function(x) { return x.sea_level }),
  //       backgroundColor: random_rgba(),
  //       label: '海面水位',
  //     },
  //   ]
  // };

  /** グラフデータ */
  const humidityGraphData = {
    labels: arr.map(function(x) {
      return [x.datetime]
    }),
    datasets: [
      {
        type: 'line', // グラフタイプを指定
        // yAxisID: 'y-axis-humidity', // y軸idを指定
        data: arr.map(function(x) { return x.humidity }),
        backgroundColor: random_rgba(),
        label: '湿度',
      },
    ]
  };

  /** グラフオプション */
  const tempGraphOption = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-temp',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: '平均気温(℃)',
          },
          ticks: {
            beginAtZero: false,
            callback: function (value, index, values) {
              return `${value}(℃)`;
            },
          },
        },
      ],
    },
  };

  /** グラフオプション */
  const pressGraphOption = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-pressure',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: '気圧(hPa)',
          },
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return `${value}(hPa)`;
            },
          },
        },
      ],
    },
  };

  /** グラフオプション */
  const humidityGraphOption = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-humidity',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: '湿度(%)',
          },
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return `${value}(%)`;
            },
          },
        },
      ],
    },
  };

  return {
    tempGraph: {
      data: tempGraphData,
      options: tempGraphOption
    },
    pressGraph: {
      data: pressGraphData,
      options: pressGraphOption
    },
    humidityGraph: {
      data: humidityGraphData,
      options: humidityGraphOption
    }
  };
}

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

export default Graph;
