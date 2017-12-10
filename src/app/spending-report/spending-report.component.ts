import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import { FirbaseService } from 'app/shared/services/firebase.service';

import {Router} from "@angular/router";

import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'spending-report',
  templateUrl: './spending-report.component.html',
  styleUrls: ['./spending-report.component.css']
})
export class SpendingReportComponent implements OnInit {
  userStates: any;
  

  constructor(private authService:AuthService, private router:Router, private fbService: FirbaseService) {
    this.userStates = this.fbService.userStates;    
  }

  ngOnInit() {

  }

}
