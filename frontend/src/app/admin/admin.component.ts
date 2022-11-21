import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @Output() series = this.getSeries();

  constructor() {}

  ngOnInit(): void {}

  getSeries() {
    return [
      {
        id: 1,
        name: 'INFO 5A APP 2021-2024',
        start: '21/08/2024',
        end: '25/08/2024',
        nbApprentices: 26,
        nbMapsWithConstraints: 19,
      },
      {
        id: 2,
        name: 'INFO 4A APP 2022-2025',
        start: '12/08/2024',
        end: '13/08/2024',
        nbApprentices: 15,
        nbMapsWithConstraints: 7,
      },
    ];
  }
}
