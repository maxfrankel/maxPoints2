import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import { FirbaseService } from 'app/shared/services/firebase.service';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    userState: any;
    email: '';

  constructor(private authService:AuthService, private router:Router, private fbService: FirbaseService, private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService) {
    this.email = this.fbService.userStates.email;
    this._ngxZendeskWebwidgetService.identify({
      email: this.email
     })
     this._ngxZendeskWebwidgetService.show()
  }

  ngOnInit() {
    // this.fbService.userState$.subscribe(x => {
    //   console.log('xxxxxxxxxxxxxxxxxxx', x);
    //   this.userState = x;
    // })
    
  }

}
