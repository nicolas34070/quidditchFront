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
  activeTitle: EventEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onComponent(name: string) {
    this.active = name;
    this.activeTitle.emit(this.active);

  }

}
