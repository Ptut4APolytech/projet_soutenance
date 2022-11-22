import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page-view.component.html',
  styleUrls: ['./home-page-view.component.scss']
})
export class HomepageViewComponent implements OnInit {
  planning: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  

}
