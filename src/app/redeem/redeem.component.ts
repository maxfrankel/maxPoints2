import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.css']
})
export class RedeemComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router, private observableMedia: ObservableMedia) {


  }

  ngOnInit() {
    
  }

}
