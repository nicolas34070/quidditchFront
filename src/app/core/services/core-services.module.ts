import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuardService } from './auth-guard.service';
import { ToasterService } from './toaster.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AuthGuardService,
        ToasterService
    ]
})
export class CoreServicesModule { }
