import { Component, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { SoutenanceJury } from '../planning-view/planning-view.component';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.scss'],
})
export class PlanningTableComponent {
  @Input() dataSource!: MatTableDataSource<SoutenanceJury>;
  @Input() update: Subject<boolean> = new Subject();

  displayedColumns: string[] = ['timeSlot', 'apprentice', 'tutor', 'room'];
}
