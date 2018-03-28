import { Component, OnInit, Directive, Input } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {AuthInfo} from "../shared/security/auth-info";
import { Router } from '@angular/router';

@Directive({
    selector: '[ngbCollapse]',
    exportAs: 'ngbCollapse',
    host: {'[class.collapse]': 'true', '[class.show]': '!collapsed'}
  })
export class NgbCollapse {
  /**
   * A flag indicating collapsed (true) or open (false) state.
   */
  @Input('ngbCollapse') collapsed = false;
}

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  authInfo: AuthInfo;
  isNavbarCollapsed = true;

  constructor(private authService:AuthService, private router:Router) {



  }

  ngOnInit() {


      this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);


  }

    changeView(text) {
        if(text=="travelReport"){
            this.router.navigate(['dashboard/travel-report']);
        } else if (text=="redeem"){
            this.router.navigate(['dashboard/redeem']);            
        } else if (text=="spendingReport"){
            this.router.navigate(['dashboard/spending-report']);            
        } else if (text=="settings") {
            this.router.navigate(['dashboard/settings']);
        } else if (text=="logout") {
            this.logout();
        }
    }




    logout() {
        this.authService.logout();
    }


}
