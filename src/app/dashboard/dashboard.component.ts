import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import { FirbaseService } from 'app/shared/services/firebase.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    userState: any;

  constructor(private authService:AuthService, private router:Router, private fbService: FirbaseService) {
    

  }

  ngOnInit() {
    console.log('2a');
    // this.fbService.userState$.subscribe(x => {
    //   console.log('xxxxxxxxxxxxxxxxxxx', x);
    //   this.userState = x;
    // })
    
  }

}
