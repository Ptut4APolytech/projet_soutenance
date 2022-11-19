import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-constraints-view',
  templateUrl: './constraints-view.component.html',
  styleUrls: ['./constraints-view.component.scss'],
})
export class ConstraintsViewComponent implements OnInit {
  lastInput = '15/08/2023';
  days = [
    {
      date: '21/08',
      fullName: 'Lundi 21/08',
    },
    {
      date: '22/08',
      fullName: 'Mardi 22/08',
    },
    {
      date: '23/08',
      fullName: 'Mercredi 23/08',
    },
    {
      date: '24/08',
      fullName: 'Jeudi 24/08',
    },
    {
      date: '25/08',
      fullName: 'Vendredi 25/08',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
