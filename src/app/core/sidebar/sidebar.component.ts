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
  activeTitle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onComponent(name) {
    console.log(this.active);
    this.active = name;
    this.activeTitle.emit(this.active);

  }

}
