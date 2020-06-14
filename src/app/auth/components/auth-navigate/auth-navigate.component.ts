import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-navigate',
  templateUrl: './auth-navigate.component.html',
  styleUrls: ['./auth-navigate.component.scss']
})
export class AuthNavigateComponent implements OnInit {
  isLoginBlockVisible: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  onTabClick(isLoginBlockVisible){
    this.isLoginBlockVisible = isLoginBlockVisible;
  }
}
