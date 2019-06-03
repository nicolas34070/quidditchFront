import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  active = 'tournois';

  @Output()
  activeTitle = new EventEmitter();

  user: User;

  constructor() {

  }

  async ngOnInit() {
    this.user  = JSON.parse(localStorage.getItem('user')) || null;
  }

  onComponent(name) {
    this.active = name;
    this.activeTitle.emit(this.active);
  }

}
