import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {FirbaseService} from "../shared/services/firebase.service";
import {Router} from "@angular/router";
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resetEmailSent: boolean = false;
  resetPasswordClicked = false;
  formError = false;
  error = false;
  errorMsg: string;
  form:FormGroup;

  constructor(
        private fb:FormBuilder, 
        private authService: AuthService, 
        private fbService: FirbaseService,
        private router:Router,
        private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService,
        private data: AuthService
    ) {
      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required],
          terms: ['', Validators.required]
      });

      this._ngxZendeskWebwidgetService.show();
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.errorMsg = message)
    this.data.currentResetStatus.subscribe(resetEmailSent => this.resetEmailSent = resetEmailSent)
  }

  // login() {
  //   const formValue = this.form.value;
  //   this.authService.login(formValue.email, formValue.password)
  //         .subscribe(
  //             (u: any) => {
  //                 console.log('0a', u.uid);
  //                 this.fbService.getUserState(u.uid)
  //                 // this.router.navigate(['/dashboard']);                  
  //               }
            
  //         );

  // }

  login() {

      const formValue = this.form.value;
      this.authService.login(formValue.email, formValue.password)
      .subscribe(
          (u: any) => {
            console.log('0a', u.uid);
            this.fbService.getUserState(u.uid)
            // this.router.navigate(['/dashboard']);                  
          }
      );
  }
  
  validate() {
    if (this.form.value.email.length > 4 && this.form.value.password.length > 4 && this.form.get('terms').value) {
      this.login();
    } else {
      console.log('failed email / pw / terms');
      this.formError = true;
      this.errorMsg = '*All fields are required*';
    }
  }

  resetPassword(ev) {
    ev ? ev.preventDefault() : null;
    const formValue = this.form.value;
    if (formValue.email) {
        this.authService.resetPassword(formValue.email)
    } else {
      this.errorMsg = 'Please input your email address.';
    }

}
  
  showPasswordReset () {
    if (this.resetPasswordClicked) {
      this.resetPasswordClicked = false;
      this.resetEmailSent = false;
      this.errorMsg = '';
      this.form = this.fb.group({
        email: ['',Validators.required],
        password: ['',Validators.required],
        terms: ['', Validators.required]
      });
    } else {
      this.resetPasswordClicked = true;
      this.resetEmailSent = false;
      this.errorMsg = '';
    }
  }

}
