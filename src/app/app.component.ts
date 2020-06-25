import { Component,OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http'; 
import { Data } from './data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Allele Line Chart';
  LineChart :any;
  data: Data[];  
  public Samples = [];  
  public Freq = [];  
  public data2: Data[];  
  public Samples2 =[];  
  public Freq2 = []; 
  //Default onload variant
  public Variant = "Variant1";
  //Card Header
  public VariantCard = "Variant 1";
  constructor(private httpClient: HttpClient) { } 
    ngOnInit()
    {
      this.Variant = "Variant1";
       
      //Scan and store variant 2 data from AlleleData.json for further use.
      this.httpClient.get("assets/AlleleData.json").subscribe(data2 =>{
        data2[0]["Variant2"].forEach (x => {
          if(x.frequency!=-1){
              this.Samples2.push(x.sample);
              this.Freq2.push(x.frequency);
          } 
        });
      });
      this.CreateChart();  
    }

    //Create chart
    CreateChart(){
      
        //console.log(this.Variant);
        //Scan and store variant 1 data from AlleleData.json to create onload chart and for further use.
        this.httpClient.get("assets/AlleleData.json").subscribe(data =>{
            data[0][this.Variant].forEach (x => {
              if(x.frequency!=-1){
                  this.Samples.push(x.sample);
                  this.Freq.push(x.frequency);
              } 
            });
        });
       // console.log(this.Samples)
  
        this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
        labels: this.Samples,
        datasets: [{
            label: 'Frequency',
            data: this.Freq,
            fill:false,
            lineTension:0,
            borderColor:"#37474F",
            borderWidth: 2
        }]
        }, 
        options: {
            responsive : true,
            title:{
            text:"Variant 1",
            display:false
        },
        scales: {
          yAxes: [{
            id: 'first-y-axis',
            type: 'linear',
            ticks: {
              beginAtZero: true
          }
        }]
        }
        }
    });
    }

    //On dropdown change : Change variate 
    ChangingValue(value:string){
      //this.LineChart=[];
      this.Variant= value;
      if (this.Variant =="Variant1"){
        this.VariantCard ="Variant 1";
        this.LineChart.options.title.text = 'Variant 1';
        this.LineChart.data.labels=this.Samples;
        this.LineChart.data.datasets[0].data=this.Freq;

      } else if (this.Variant =="Variant2"){
        this.VariantCard ="Variant 1";
        this.LineChart.options.title.text = 'Variant 2';
        this.LineChart.data.labels=this.Samples2;
        this.LineChart.data.datasets[0].data=this.Freq2;
      }
      this.LineChart.update();
    }
}



