import { observer, inject } from 'mobx-react';
import React from 'react';
import Dialog from 'material-ui/Dialog'
import moment from 'moment'
import { Chart } from 'react-google-charts'
import FlatButton from 'material-ui/FlatButton'

@inject('kidStore') @observer
class KidDetails extends React.Component {
  constructor(props) {
    super(props);
    };

  actions = [
    <FlatButton
      label="Close"
      primary={true}
      onClick={()=>this.props.kidStore.handleDetailsClose()}
    />
  ];

  chartActions() {
    console.log("yaaay")
  }

  render(){
    const { kidStore } = this.props;

    const chartColumns = [
      {id:'Location',type:'string'},
      {id:'Start',type:'date'},
      {id:'End',type:'date'},
    ]

    const events = kidStore.kidDetails.events
    console.log(events)
    const chartRows = events.map((event, index, events) => {
      let end_time = new Date()
      if (index != events.length - 1) {
        end_time = new Date(events[index+1].created_at)
      }
      let start_time = new Date(event.created_at)
      return(
        [event.location_name, start_time, end_time]
      )
    })

    const chart =
    <Chart
      chartType = "Timeline"
      columns={chartColumns}
      rows= {chartRows}
      options = {{}}
      graph_id = "TimelineChart"
      width={"100%"}
      height={"300px"}
      chartEvents={this.chartEvents}
      chartPackages={['timeline']}/>


    return(
      <Dialog
        title={kidStore.kidDetails.kid.full_name}
        actions={this.actions}
        modal={false}
        open={kidStore.detailsOpen}
        onRequestClose={()=>kidStore.handleDetailsClose()}
        >
            {chart}
        </Dialog>
    )
  }

}

export default KidDetails;
