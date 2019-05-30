import { TestBed } from '@angular/core/testing';

import { ErrorPageService } from './error-page.service';
import { ErrorPageTypes } from 'src/app/enums/error-page';

describe('ErrorPageService', () => {
    let service: ErrorPageService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorPageService
            ]
        });
        service = TestBed.get(ErrorPageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Test error infos getter', () => {
        it('should get the right error', () => {
            const notFound = service.getError(ErrorPageTypes.NotFound);
            expect(notFound.title).toBe('404');
            expect(notFound.message).toBe('Page Not Found');
            expect(notFound.imgSrc).toBe('assets/imgs/errors/http-status-404.png');
        });
    });
});
