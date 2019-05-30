import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageTypes } from 'src/app/enums/error-page';
import { ErrorPageService } from './error-page.service';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss'],
    providers: [ErrorPageService]
})
export class ErrorPageComponent implements OnInit {


    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------


    public title: string;
    public message: string;
    public imgSrc: string;



    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor(
        private errorPageService: ErrorPageService,
        private route: ActivatedRoute
    ) { }



    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------


    /**
     * On init, if error type exists, set properties of Error page.
     */
    ngOnInit() {
        this.route.data.subscribe(
            (data: { type: ErrorPageTypes }) => {
                const errorInfos = this.errorPageService.getError(data.type);

                if (errorInfos !== undefined) {
                    this.title = errorInfos.title;
                    this.message = errorInfos.message;
                    this.imgSrc = errorInfos.imgSrc;
                }
            }
        );
    }
}
