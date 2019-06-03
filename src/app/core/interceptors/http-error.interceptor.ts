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


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor(private toasterService: ToasterService, private router: Router) { }



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
                            message = 'Bad Request.';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                        case 401:
                            // Redirect to login.
                           this.router.navigate(['/login']);
                           break;

                        case 403:
                            message = 'Access Denied.';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                        case 404:
                            message = 'Not Found.';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                        case 500:
                            message = 'Internal Server Error.';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                            break;

                        default:
                            message = 'An error occured.';
                            this.toasterService.displayToast(message, ColorPaletteTypes.warn, 3000);
                    }
                }

                return throwError(error);
            })
        );
    }
}
