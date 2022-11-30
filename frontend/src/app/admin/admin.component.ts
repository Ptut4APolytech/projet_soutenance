import {Component, Input, OnInit, Output} from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  series: any = [];

  constructor(private appService: AppService) {
    this.appService.getSeries().subscribe((data: any) => {
      this.series = data;
    });
  }

  onDeleteSerie(id: number) {
    this.appService.deleteSerie(id).subscribe(() => {
      this.series = this.series.filter((serie: any) => serie.id !== id);
    });
  }

  ngOnInit(): void {}
}
