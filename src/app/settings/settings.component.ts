import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import { FirbaseService } from 'app/shared/services/firebase.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';


import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";
import { fail } from 'assert';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private _successReset = new Subject<string>();
  
  staticAlertClosed = false;
  successMessage: string;
  email: '';
  errorMessage: string = null;

  constructor(private authService:AuthService, private router:Router, private fbService:FirbaseService) {
    this.email = this.fbService.userStates.email;

  }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._successReset.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._successReset, 5000).subscribe(() => this.successMessage = null);
  }

  resetPassword(email: string) {
    this.authService.resetPassword(this.email);
    this._successReset.next(`Success! Please check your e-mail for next steps.`);
  }

}
