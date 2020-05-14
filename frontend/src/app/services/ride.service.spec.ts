/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { RideService } from './ride.service';

describe('Service: Ride', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RideService]
        });
    });

    it('should ...', inject([RideService], (service: RideService) => {
        expect(service).toBeTruthy();
    }));
});
