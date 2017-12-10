import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {  FirbaseService} from "../shared/services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthService, private fbService: FirbaseService,
                private router:Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });


  }

  ngOnInit() {
  }


  login() {

      const formValue = this.form.value;

    //   this.authService.login(formValue.email, formValue.password)
      this.authService.login("test@test.com", "123456")
          .subscribe(

              (u: any) => {
                  console.log('0a', u.uid);
                  this.fbService.getUserState(u.uid)
                }
            
          );


  }

}
