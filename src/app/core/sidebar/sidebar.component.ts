import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  active: string = "tournois";

  @Output()
  activeTitle: EventEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onComponent(name) {
    this.active = name;
    this.activeTitle.emit(this.active);

  }

}
