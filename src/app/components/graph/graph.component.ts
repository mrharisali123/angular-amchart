import { Component, NgZone, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins from '@amcharts/amcharts4/plugins/sunburst';
import { DataService } from '../../services/data.service';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
})
export class graphComponent implements OnInit {
  // countries = [
  //   'India',
  //   'Nepal',
  //   'Bangladesh',
  //   'Pakistan',
  //   'Bhutan',
  //   'Sri Lanka',
  //   'Maldives',
  // ];

  private chart: am4plugins.Sunburst;
  chartStats: any;
  countryWiseData: [];
  caseData = [];
  constructor(private zone: NgZone, private dataService: DataService) {}
  ngOnInit() {
    // this.dataService.getCountries().subscribe((data: any) => {
    //   console.log(data);
    //   this.chartStats = data;
    //   if (data) {
    //     this.getChart();
    //   }
    // });

    this.getCasesData();
  }
  getCasesData() {
    this.dataService.getCountries().subscribe((data) => {
      this.chartStats = data;
      this.chartStats.forEach((values) => {
        console.log(values);
        this.caseData.push({
          name: values.country,
          children: [
            { name: 'Total Cases', value: values.cases },
            { name: 'Recovered', value: values.recovered },
            { name: 'Deaths', value: values.deaths },
            { name: 'Active Cases', value: values.active },
          ],
        });
      });
      console.log(this.caseData);
      this.getChart();
      return this.caseData;
    });
  }

  getChart() {
    // this.zone.runOutsideAngular(() => {

    let chart = am4core.create('chartdiv', am4plugins.Sunburst);
    chart.colors.list = [
      am4core.color('#845EC2'),
      am4core.color('#D65DB1'),
      am4core.color('#FF6F91'),
      am4core.color('#FF9671'),
      am4core.color('#FFC75F'),
      am4core.color('#F9F871'),
      am4core.color('#5482cc'),
    ];
    chart.radius = am4core.percent(100);
    chart.colors.step = 2;
    // Add multi-level data
    chart.data = this.caseData;
    // chart.data = [
    //   {
    //     name: 'First',
    //     children: [
    //       { name: 'A1', value: 100 },
    //       { name: 'A2', value: 60 },
    //     ],
    //   },
    //   {
    //     name: 'Second',
    //     children: [
    //       { name: 'B1', value: 135 },
    //       { name: 'B2', value: 98 },
    //     ],
    //   },
    //   {
    //     name: 'Third',
    //     children: [
    //       {
    //         name: 'C1',
    //         children: [
    //           { name: 'EE1', value: 130 },
    //           { name: 'EE2', value: 87 },
    //           { name: 'EE3', value: 55 },
    //         ],
    //       },
    //       { name: 'C2', value: 148 },
    //       {
    //         name: 'C3',
    //         children: [
    //           { name: 'CC1', value: 53 },
    //           { name: 'CC2', value: 30 },
    //         ],
    //       },
    //       { name: 'C4', value: 26 },
    //     ],
    //   },
    //   {
    //     name: 'Fourth',
    //     children: [
    //       { name: 'D1', value: 415 },
    //       { name: 'D2', value: 148 },
    //       { name: 'D3', value: 89 },
    //     ],
    //   },
    //   {
    //     name: 'Fifth',
    //     children: [
    //       {
    //         name: 'E1',
    //         children: [
    //           { name: 'EE1', value: 33 },
    //           { name: 'EE2', value: 40 },
    //           { name: 'EE3', value: 89 },
    //         ],
    //       },
    //       {
    //         name: 'E2',
    //         value: 148,
    //       },
    //     ],
    //   },
    // ];

    // Define data fields
    chart.dataFields.value = 'value';
    chart.dataFields.name = 'name';
    chart.dataFields.children = 'children';

    // });

    var level0 = chart.seriesTemplates.create('0');
    level0.labels.template.text = '{category}';

    // Configure levels
    var level1 = chart.seriesTemplates.create('1');
    level1.slices.template.fillOpacity = 0.75;
    level1.labels.template.text = '{category}';
    level1.hiddenInLegend = true;

    // Add legend
    chart.legend = new am4charts.Legend();
  }
}
