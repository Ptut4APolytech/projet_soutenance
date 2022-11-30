import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-planning-view',
  templateUrl: './planning-view.component.html',
  styleUrls: ['./planning-view.component.scss'],
})
export class PlanningViewComponent implements OnInit {
  panelOpenState = false;
  dataSource = new MatTableDataSource<SoutenanceJury>(ELEMENT_DATA);
  data: SoutenanceJury[] = ELEMENT_DATA;
  dateRange: Date[] = [];
  selectedDate: Date = new Date();
  juryDistinct: Number[] = [];
  step: Number = -1;
  changingTab: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.juryDistinct = [...new Set(this.data.map((x) => x.jury))];
    let datesArray = [...new Set(this.data.map((x) => x.date))];
    this.dateRange = datesArray
      .filter(
        (date, i, self) =>
          self.findIndex((d) => d.getTime() === date.getTime()) === i
      )
      .sort(function (a, b) {
        return a.getTime() - b.getTime();
      });

    this.selectedDate = this.dateRange[0];
  }

  selectDateTab(event: MatTabChangeEvent): void {
    let dateParts = event.tab.textLabel.split('/');
    var dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    this.selectedDate = new Date(dateObject);
    this.step = -1;
  }

  selectJuryData(juryCode: Number, index: Number) {
    this.dataSource.data = this.data.filter(
      (x) =>
        x.date.getTime() === this.selectedDate.getTime() && x.jury === juryCode
    );
    this.step = index;
    this.changingTab.next(true);
  }
}

export interface SoutenanceJury {
  date: Date;
  timeSlot: string;
  apprentice: string;
  tutor: string;
  room: number;
  jury: number;
}

const ELEMENT_DATA: SoutenanceJury[] = [
  {
    date: new Date(1916, 4, 23),
    timeSlot: '8h - 8h30',
    apprentice: 'Simon RE',
    tutor: 'Aluminum',
    room: 16,
    jury: 1,
  },
  {
    date: new Date(1916, 4, 23),
    timeSlot: '8h - 8h30',
    apprentice: 'Leo TOTON',
    tutor: 'Aluminum',
    room: 22,
    jury: 1,
  },
  {
    date: new Date(1916, 4, 23),
    timeSlot: '8h - 8h30',
    apprentice: 'Celestin DEAL',
    tutor: 'Aluminum',
    room: 18,
    jury: 2,
  },
  {
    date: new Date(1916, 4, 23),
    timeSlot: '8h - 8h30',
    apprentice: 'Julien ROBIN',
    tutor: 'Aluminum',
    room: 19,
    jury: 2,
  },
  {
    date: new Date(1916, 4, 23),
    timeSlot: '8h - 8h30',
    apprentice: 'Pauline FRANQUELIN',
    tutor: 'Aluminum',
    room: 22,
    jury: 2,
  },
  {
    date: new Date(1916, 4, 23),
    timeSlot: '8h - 8h30',
    apprentice: 'Robin LUSSON',
    tutor: 'Aluminum',
    room: 21,
    jury: 2,
  },
  {
    date: new Date(1916, 4, 23),
    timeSlot: '8h - 8h30',
    apprentice: 'Baptiste DEREMBLE',
    tutor: 'Aluminum',
    room: 20,
    jury: 3,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Gautier TENANT',
    tutor: 'Aluminum',
    room: 20,
    jury: 3,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Lilian LABROSSE',
    tutor: 'Aluminum',
    room: 20,
    jury: 3,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Clara BEAL',
    tutor: 'Aluminum',
    room: 19,
    jury: 3,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Nathan PURICELLI',
    tutor: 'Aluminum',
    room: 19,
    jury: 2,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Martin BERRY',
    tutor: 'Aluminum',
    room: 19,
    jury: 3,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Aluminum',
    tutor: 'Aluminum',
    room: 19,
    jury: 2,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Silicon',
    tutor: 'Aluminum',
    room: 19,
    jury: 1,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Phosphorus',
    tutor: 'Aluminum',
    room: 19,
    jury: 1,
  },
  {
    date: new Date(1954, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Sulfur',
    tutor: 'Aluminum',
    room: 19,
    jury: 1,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Chlorine',
    tutor: 'Aluminum',
    room: 19,
    jury: 3,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Argon',
    tutor: 'Aluminum',
    room: 19,
    jury: 2,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Potassium',
    tutor: 'Aluminum',
    room: 19,
    jury: 1,
  },
  {
    date: new Date(1924, 5, 28),
    timeSlot: '8h - 8h30',
    apprentice: 'Calcium',
    tutor: 'Aluminum',
    room: 19,
    jury: 1,
  },
];
