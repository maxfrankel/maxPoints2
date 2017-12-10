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
  // userStates: object = {
  //   callUsed: false,
  //   report: "https://docs.google.com/gview?url=http://res.cloudinary.com/maxpoints/image/upload/v1512599775/bill_of_lading_delivery_wbjvu4.pdf&embedded=true",
  //   reportCreated: true 
  // }
  

  constructor(private authService:AuthService, private router:Router, private fbService: FirbaseService, private sanitizer: DomSanitizer) {
    this.userStates = this.fbService.userStates;
    // this.fbService.userState$.subscribe(x => {
    //   console.log('xxxxxxxxxxxxxxxxxxx', x);
    //   this.userStates = x;
    // });
    this.url = this.photoUrl();
  }
  
  ngOnInit() {
    
  }
  
  photoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.userStates.report);
  }

}
