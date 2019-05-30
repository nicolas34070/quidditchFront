import { Injectable } from '@angular/core';
import { ErrorPageTypes } from 'src/app/enums/error-page';

@Injectable()
export class ErrorPageService {


    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor() { }



    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------


    /**
     * Get error content from an error type.
     * @param {ErrorPageTypes} errorType - The error type.
     * @returns {{ title: string, message: string }}
     */
    getError(errorType: ErrorPageTypes): { title: string, message: string, imgSrc: string } {
        let errorInfos: { title: string, message: string, imgSrc: string };

        switch (errorType) {
            case ErrorPageTypes.NotFound:
                errorInfos = { title: '404', message: 'Page Not Found', imgSrc: 'assets/imgs/errors/http-status-404.png' };
        }

        return errorInfos;
    }
}
