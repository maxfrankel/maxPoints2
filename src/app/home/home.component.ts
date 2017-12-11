import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import { FirbaseService } from 'app/shared/services/firebase.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userStates: any;
  url: any;
  // subscription = [];

  

  constructor(private authService:AuthService, private router:Router, private fbService: FirbaseService, private sanitizer: DomSanitizer) {
    this.userStates = this.fbService.userStates;
    this.url = this.photoUrl();
    // this.subscription[0] = 
    // this.fbService.userState$.subscribe(x => {
    //   console.log('xxxxxxxxxxxxxxxxxxx', x);
    //   this.userStates = x;
    // });
  }
  
  ngOnInit() {
    
  }

  // ngOnDestroy() {
  //   this.subscription.map(x => x.unsubscribe());
  // }
  
  photoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.userStates.report);
  }

}
