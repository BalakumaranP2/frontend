import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  public headers:any;
  public datas:any;
  public requestId:any;
  public view = false;
  constructor(
    private viewService: ViewService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.requestId = history.state.requestId;
    if (this.requestId) {
      this.view = true
    }
    this.viewService.getProcessingData(this.requestId).subscribe(res => {
      if (res) {
        res.dateOfDelivery = this.datePipe.transform(Date.now(),'yyyy-MM-dd')
        this.datas = [res];
        this.headers = Object.keys(this.datas[0]);
      }
    })
  }

}
