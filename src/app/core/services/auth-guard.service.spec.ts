import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
    let router: Router;
    let service: AuthGuardService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
        }).compileComponents();
        router = TestBed.get(Router);
        service = TestBed.get(AuthGuardService);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    describe('canActivate()', () => {
        it('should return true', () => {
            expect(service.canActivate()).toBeTruthy();
        });
    });
});
