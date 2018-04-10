import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireModule} from "angularfire2";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { HomeComponent } from './home/home.component';
import { SpendingReportComponent } from './spending-report/spending-report.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedeemComponent } from './redeem/redeem.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/security/auth.service";
import {AuthGuard} from "./shared/security/auth.guard";
import {FirbaseService} from "./shared/services/firebase.service";
import {HttpModule} from "@angular/http";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {ngxZendeskWebwidgetModule, ngxZendeskWebwidgetConfig} from 'ngx-zendesk-webwidget';
import {typeformEmbed} from '@typeform/embed';

export class ZendeskConfig extends ngxZendeskWebwidgetConfig {
  accountUrl = 'maxpoints.zendesk.com';
  beforePageLoad(zE) {
    zE.setLocale('en');
    zE.hide();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    SafeUrlPipe,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    FooterComponent,
    RedeemComponent,
    DashboardComponent,
    SettingsComponent,
    SpendingReportComponent
  ],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      RouterModule.forRoot(routerConfig),
      ReactiveFormsModule,
      HttpModule,
      NgbModule.forRoot(),
      ngxZendeskWebwidgetModule.forRoot(ZendeskConfig)
  ],
  providers: [AuthService, AuthGuard, FirbaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

