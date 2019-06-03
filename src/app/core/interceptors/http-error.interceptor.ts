import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ColorPaletteTypes } from 'src/app/enums/color-palette';
import { ToasterService } from '../services/toaster.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../services/auth.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor(private toasterService: ToasterService, private authService: AuthService) { }



    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------


    /**
     * Intercept Error HTTP from a request and redirect to Error page.
     * @param {HttpRequest<any>} request - Request send to server
     * @param {HttpHandler} next - Handle HTTP request
     * @returns {Observable}
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let message: string;
                if (error instanceof HttpErrorResponse && error.status) {

                    switch (error.status) {
                        case 400:
                            message = 'Erreur dans la rêquete.';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                      case 401:
                            message = 'Vous n\'êtes pas autorisé à voir cette page!';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            this.authService.logout();

                            break;

                        case 403:
                            message = 'Accès refusé.';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                        case 404:
                            message = 'Introuvable';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                        case 500:
                            message = 'Erreur interne du server';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                        default:
                            message = 'Une erreur est survenue';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                    }
                }

                return throwError(error);
            })
        );
    }
}
