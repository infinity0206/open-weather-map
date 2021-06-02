import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Graph } from './graph';
import Header from '../../components/header';
import PersistentDrawerLeft from '../../components/sidemenu';

const columns = [
  { field: 'datetime', headerName: '時間', width: 200 },
  { field: 'temp', headerName: '気温', width: 200 },
  { field: 'feels_like', headerName: '体感気温', width: 200 },
  { field: 'temp_min', headerName: '最低気温', width: 200 },
  { field: 'temp_max', headerName: '最高気温', width: 200 },
  { field: 'pressure', headerName: '気圧', width: 200 },
  { field: 'sea_level', headerName: 'sea_level', width: 200 },
  { field: 'grnd_level', headerName: 'grnd_level', width: 200 },
  { field: 'humidity', headerName: '湿度', width: 200 },
  { field: 'temp_kf', headerName: 'temp_kf', width: 200 },
];

const Weather = (props) => (
  <>
    <Header />,
    <PersistentDrawerLeft />,
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={props.data}
        columns={columns}
        pageSize={20}
        checkboxSelection
      />
    </div>
  </>
);

Weather.getInitialProps = async function () {
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
  console.log(arr);
  return { data: arr };
};

export default Weather;
