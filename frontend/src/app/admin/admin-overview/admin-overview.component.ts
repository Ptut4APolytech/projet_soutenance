import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss', '../admin.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  @Input() serie: any;
  @Output() deleteSerie = new EventEmitter<number>();

  constructor() {}

  onDeleteClick() {
    this.deleteSerie.emit(this.serie.id);
  }

  ngOnInit(): void {}
}
