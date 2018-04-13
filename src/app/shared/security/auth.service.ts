import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthInfo } from "./auth-info";
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

    static UNKNOWN_USER = new AuthInfo(null);

    authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

    private messageSource = new BehaviorSubject<string>("default message");
    currentMessage = this.messageSource.asObservable();

    constructor(private afAuth: AngularFireAuth, private router: Router) {

    }

    changeMessage(message: string) {
        this.messageSource.next(message)
    }


    login(email, password): Observable<AuthInfo> {
        return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }

    resetPassword(email: string) {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => console.log("email sent"))
            .catch((error) => console.log(error))
    }

    signUp(email, password) {
        return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
    }

    /*
     *
     * This is a demo on how we can 'Observify' any asynchronous interaction
     *
     *
     * */

    fromFirebaseAuthPromise(promise): Observable<any> {

        const subject = new Subject<any>();

        promise
            .then(res => {
                const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid);
                this.authInfo$.next(authInfo);
                subject.next(res);
                subject.complete();
            },
            err => {
                this.authInfo$.error(err);
                this.changeMessage(err.message);
                subject.error(err);
                subject.complete();
                console.log()
            });

        return subject.asObservable();
    }


    logout() {
        this.afAuth.auth.signOut();
        this.authInfo$.next(AuthService.UNKNOWN_USER);
        this.router.navigate(['/login']);

    }

}
