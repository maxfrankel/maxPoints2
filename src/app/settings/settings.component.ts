import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";

import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) {


  }

  ngOnInit() {

  }

}
