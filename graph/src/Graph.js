import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;


let dps1=[];
let dps2=[];


class Test extends Component {
	constructor(props) {
        super(props);
        this.state = {nn:{
                title :{
                    text: "Synthetic Value"
                },
                data: []}
            }}
	
	componentDidMount = (event) => {
        const socket = io("http://192.168.0.101:5000");
        socket.on('data1', (msg) => {
         let labelVal=msg[0]
         let yVal=msg[1]
         
         dps1.push({label: labelVal,y: yVal})
          const dataa = [{
            type: "line",
            indexLabel: "{label}, {y}", 
            dataPoints : dps1}];
          this.setState({nn: {title :{
            text: "Synthetic Value"
        },data :dataa}});
          console.log(this.state.nn);
        })
    }
    render(){
		return (
		<div>
			<CanvasJSChart options = {this.state.nn}
				 onRef={ref => this.chart = ref}
			/>
				</div>
		)}
	}


class Test1 extends Component {
	constructor(props) {
        super(props);
        this.state = {nn:{
                title :{
                    text: "Synthetic Ratio"
                },
                data: []}
            }}
	
	componentDidMount = (event) => {
        const socket = io("http://192.168.0.101:5000");
        socket.on('data2', (msg) => {
         let labelVal=msg[0]
         let yVal=msg[1]
        
         dps2.push({label: labelVal,y: yVal})
          const dataa = [{
            type: "line",
            indexLabel: "{label}, {y}",   
            dataPoints : dps2}];
          this.setState({nn: {title :{
            text: "Synthetic Ratio"
        },data :dataa}});
          console.log(this.state.nn);
        })
    }
    render(){
		return (
		<div>
			<CanvasJSChart options = {this.state.nn}
				 onRef={ref => this.chart = ref}
			/>
				</div>
		)}
	}

export { Test,Test1};
    