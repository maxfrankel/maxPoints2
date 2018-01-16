

import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/security/auth.guard";
import { RedeemComponent } from "app/redeem/redeem.component";
import { SpendingReportComponent } from "app/spending-report/spending-report.component";
import { SettingsComponent } from "app/settings/settings.component";

export const routerConfig : Route[] = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [
            AuthGuard
        ],
        children: [
            {
                path:'travel-report',
                component: HomeComponent
            },
            {
                path:'redeem',
                component: RedeemComponent
            },
            {
                path:'spending-report',
                component: SpendingReportComponent
            },
            {
                path:'settings',
                component: SettingsComponent
            },
            // {
            //     path:'spending-report',
            //     component: 
            // },

        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];





