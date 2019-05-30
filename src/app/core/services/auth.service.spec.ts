import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CoreModule } from '../core.module';

const credentialsMock = {
    email: 'hugo.malzieux@altran.com',
    password: 'testtest'
};
const fakeAuthState = new BehaviorSubject(null); // <= Pay attention to this guy

let mockRouter: any;
class MockRouter {
    //noinspection TypeScriptUnresolvedFunction
    navigate = jasmine.createSpy('navigate');
}

const fakeSignInHandler = (email, password): Promise<any> => {
    fakeAuthState.next(credentialsMock);
    return Promise.resolve(credentialsMock);
};

const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
};

const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
        signInWithEmailAndPassword: jasmine
            .createSpy('signInWithEmailAndPassword')
            .and
            .callFake(fakeSignInHandler),
        signOut: jasmine
            .createSpy('signOut')
            .and
            .callFake(fakeSignOutHandler),
    },
};

fdescribe('AuthService', () => {

    let router: Router;
    let service: AuthService;
    let afAuth: AngularFireAuth;
    let isAuth$: Subscription;
    let isAuthRef: boolean;

    beforeEach(async () => {
        mockRouter = new MockRouter();
        TestBed.configureTestingModule({
            imports: [
                CoreModule
            ],
            providers: [
                AuthService,
            ],
        });

        afAuth = TestBed.get(AngularFireAuth);
    });

    beforeEach(() => {
        service = TestBed.get(AuthService);
    });

    afterEach(() => {
        fakeAuthState.next(null);

        isAuth$.unsubscribe();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('isAuthenticated()', () => {
        it('should return false', () => {
            service.isAuthenticated();
            expect(service.isLoggedIn).toBeFalsy();
        });
    });

    describe('login()', () => {
        it('should return true', () => {
            const mock = TestBed.get(AngularFireAuth);
            const spy = spyOn(angularFireAuthStub.auth, 'signInWithEmailAndPassword').and.callThrough();
            mock.auth = angularFireAuthStub.auth;

            service.login(credentialsMock);

            expect(spy).toHaveBeenCalledWith(credentialsMock.email, credentialsMock.password);



            // service.login({ email: 'hugo.malzieux@altran.com', password: 'testtest' });
            // expect(service.isLoggedIn).toBeTruthy();
        });
    });
});
