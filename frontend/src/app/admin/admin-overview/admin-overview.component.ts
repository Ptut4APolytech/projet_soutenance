import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss', '../admin.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  @Input() serie: any;

  constructor() {}

  ngOnInit(): void {}
}
