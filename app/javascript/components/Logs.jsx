import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Chart } from 'react-google-charts';


import { observer, inject } from 'mobx-react';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '20px'
  },
  chart: {
    flexGrow: 1,
    margin: 10,
    padding: '10px',
  },
  selectField: {
    marginBottom: '20px',
  }
};

@inject('eventStore') @observer
class Logs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.eventStore.fetchAll();
  }

  chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
          console.log('Selected ', Chart.chart.getSelection());
        },
      },
    ];

  render() {
    const { eventStore } = this.props;
    if (eventStore.state == 'loading') {
      return(
        <div>loading</div>
      )
    } else {
      return(
        <div style={styles.root}>
          <h2>Event Logs</h2>
          {/* <Chart
            style={styles.chart}
            data={eventStore.lineChartData}
            chartType="Line"
            options={{curveType: 'function'}}
            width={'100%'}
            height='500px'
            chartEvents={this.chartEvents}
          /> */}
          <Chart
            style={styles.chart}
            chartType="Table"
            options={eventStore.chartData.options}
            chartPackages={['table']}
            columns={eventStore.chartData.columns}
            rows={eventStore.chartData.rows}
            width={'100%'}
            height='1000px'
            chartEvents={this.chartEvents}
          />
        </div>
      )
    }
  }
}

export default Logs;
