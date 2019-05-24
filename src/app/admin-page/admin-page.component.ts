import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  active: string = "tournois";

  onActive(event: string) {
    this.active = event;
  }

  constructor() { }

  ngOnInit() {
  }
}
