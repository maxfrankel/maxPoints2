import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/security/auth.service";
import { Router } from "@angular/router";
import { FirbaseService } from 'app/shared/services/firebase.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';


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

  constructor(private authService: AuthService, private router: Router, private fbService: FirbaseService) {
    this.email = this.fbService.userStates.email;

  }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._successReset.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._successReset, 5000).subscribe(() => this.successMessage = null);
  }

  resetPassword(email: string) {
    this.authService.resetPassword(this.email);
    this._successReset.next('Success! Please check your e-mail, ' + this.email + ', for next steps.');
  }

  // initializeZendesk() {
  //   window.zEmbed || function (e, t) { var n, o, d, i, s, a = [], r = document.createElement("iframe"); window.zEmbed = function () { a.push(arguments) }, window.zE = window.zE || window.zEmbed, r.src = "javascript:false", r.title = "", r.role = "presentation", (r.frameElement || r).style.cssText = "display: none", d = document.getElementsByTagName("script"), d = d[d.length - 1], d.parentNode.insertBefore(r, d), i = r.contentWindow, s = i.document; try { o = s } catch (e) { n = document.domain, r.src = 'javascript:var d=document.open();d.domain="' + n + '";void(0);', o = s } o.open()._l = function () { var e = this.createElement("script"); n && (this.domain = n), e.id = "js-iframe-async", e.src = "https://assets.zendesk.com/embeddable_framework/main.js", this.t = +new Date, this.zendeskHost = "maxpoints.zendesk.com", this.zEQueue = a, this.body.appendChild(e) }, o.write('<body onload="document._l();">'), o.close() }();

  // }

}
