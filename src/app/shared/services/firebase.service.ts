import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable, Subject } from "rxjs/Rx";
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import {Router} from "@angular/router";


@Injectable()
export class FirbaseService {
    userStates: any;
    // userState$: Subject<any> = new Subject<any>();

    constructor(private db: AngularFireDatabase, private router: Router) {
    }

    getUserState(uid) {
        this.db.app.database().ref('/').child('user-states').child(uid).once('value',
            (success) => {
                this.userStates = success.val();
                // this.userState$.next(success.val());
                this.router.navigate(['/dashboard/travel-report']);
            });
    }
 
}
