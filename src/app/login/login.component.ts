import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {FirbaseService} from "../shared/services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resetEmailSent = false;
  resetPasswordClicked = false;
  formError = false;
  error = false;
  form:FormGroup;

  constructor(
        private fb:FormBuilder, 
        private authService: AuthService, 
        private fbService: FirbaseService,
        private router:Router
    ) {
      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required],
          terms: ['', Validators.required]
    });


  }

  ngOnInit() {
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

      if (this.validate()) {
        this.authService.login(formValue.email, formValue.password)
          .subscribe(
              (u: any) => {
                  console.log('0a', u.uid);
                  this.fbService.getUserState(u.uid)
                  // this.router.navigate(['/dashboard']);                  
                }
            
          );

      } else {
        console.log('failed email / pw / terms');
        this.formError = true;
      }
  }
  
validate(): boolean {
  return this.form.value.email.length > 4 && this.form.value.password.length > 4 && this.form.get('terms').value;
}

  resetPassword(ev) {
    ev ? ev.preventDefault() : null;
    const formValue = this.form.value;
    if (formValue.email) {
        this.authService.resetPassword(formValue.email)
        .then(res => {
          this.resetEmailSent = true
        }).catch(err => {
            console.log(err);
        });
    } else {
      this.error = true;
        // this.ts.call('Please type your email address');
    }

}
  
  showPasswordReset () {
    this.resetPasswordClicked = true
  }

}
