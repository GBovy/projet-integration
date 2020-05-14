/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapsMarkerService } from './maps-marker.service';

describe('Service: MapsMarker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsMarkerService]
    });
  });

  it('should ...', inject([MapsMarkerService], (service: MapsMarkerService) => {
    expect(service).toBeTruthy();
  }));
});
