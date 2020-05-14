import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
// import 'leaflet-control-geocoder';
import { tileLayer } from 'leaflet';
import 'leaflet-routing-machine';
import { combineLatest } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { MapsMarkerService } from 'src/app/services/business/maps-marker.service';
// import { MapsMarkerService } from 'src/app/services/business/maps-marker.service';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']//,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsComponent implements OnInit, OnChanges, OnDestroy {

    public map: L.Map;
    public routeControl;
    public options;
    public geocoder: L.Control.Geocoder;

    // Open Street Map definitions
    private LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

    public startingMarker = { lat: 0, lng: 0 };
    public endingMarker = { lat: 0, lng: 0 };

    @Input()
    public startingAddress: string;

    @Input()
    public endingAddress: string;

    @Output()
    public distance: number;

    @Output()
    public ride = new EventEmitter<{ distance: number, duration: number }>();

    constructor(private mapsMarkerService: MapsMarkerService) { }

    ngOnInit() {

        // Values to bind to Leaflet Directive
        this.options = {
            layers: [this.LAYER_OSM],
            zoom: 11,
            center: [50.8469, 4.3775],
            scrollWheelZoom: true
        };
    }
    ngOnDestroy(): void {
        this.map.remove();
    }

    ngOnChanges(changes: SimpleChanges) {

        if ((changes.startingAddress && changes.startingAddress.currentValue !== changes.startingAddress.previousValue) ||
            (changes.endingAddress && changes.endingAddress.currentValue !== changes.endingAddress.previousValue)) {

            // this.options.center =  latLng(this.startingMarker.lat, this.startingMarker.lng);

            combineLatest([
                this.mapsMarkerService.makeAddressesMarkers(this.startingAddress),
                this.mapsMarkerService.makeAddressesMarkers(this.endingAddress)
            ]).pipe(
                take(1),
                map(([startingMarker, endingMarker]) => {

                    // lat and lng for starting address and ending address
                    this.startingMarker.lat = +startingMarker[0].lat;
                    this.startingMarker.lng = +startingMarker[0].lon;
                    this.endingMarker.lat = +endingMarker[0].lat;
                    this.endingMarker.lng = +endingMarker[0].lon;


                    this.mapsMarkerService.getMapsData(this.startingMarker, this.endingMarker)
                        .pipe(take(1))
                        .subscribe((res: any) => {
                            const ride = { distance: 0, duration: 0 };
                            ride.duration = res.duration / 60;
                            ride.distance = res.distance / 1000;
                            this.ride.emit(ride);
                        });

                    // set map itinerary
                    L.Routing.control({
                        serviceUrl: 'https://routing.openstreetmap.de/routed-car/route/v1',
                        waypoints: null,
                        lineOptions: {
                            styles: [{ color: '#19afc3', opacity: 0.8, weight: 9 },
                            { color: '#00ffb4', opacity: 0.8, weight: 6 },
                            { color: '#00fdf6', opacity: 1, weight: 2 }],
                            addWaypoints: false
                        },
                        routeWhileDragging: false,
                        reverseWaypoints: false,
                        showAlternatives: false,
                        showSteps: false,
                        alternatives: false,
                        steps: false,
                        show: true,
                        useHints: false,
                        draggable: false,
                        clickable: false
                    }).setWaypoints([
                        L.latLng(this.startingMarker.lat, this.startingMarker.lng),
                        L.latLng(this.endingMarker.lat, this.endingMarker.lng)

                    ]).addTo(this.map);
                }),
                shareReplay(1)
            ).subscribe(res => res);

        }

    }


    // public removeMarker() {
    //     this.markers.pop();
    // }

    public onMapReady(map: L.Map) {
        this.map = map;
        this.routeControl = L.Routing.control({
            router: new L.Routing.osrmv1({
                language: 'en',
                profile: 'car'
            }),
            // geocoder: L.Control.Geocoder.nominatim({ serviceUrl: 'https://nominatim.openstreetmap.org/' }),
            routeWhileDragging: false

        }).addTo(this.map);
        // L.control.coordinates({}).addTo(map);
        // map.fitBounds(this.route.getBounds(), {
        //     padding: point(24, 24),
        //     maxZoom: 12,
        //     animate: true
        //   });


        // // change the view using that map reference to another location
        // changeView() {
        //     this.map.panTo(new L.LatLng(40.737, -73.923));
        // }
    }



    // Output binding for center
    // onCenterChange(center: LatLng[]) {
    // 	setTimeout(() => {
    // 		this.startingMarker = center.lat;
    // 		this.endingMarker = center.lng;
    // 	});
    // }

    // onZoomChange(zoom: number) {
    // 	setTimeout(() => {
    // 		this.formZoom = zoom;
    // 	});
    // }

    // doApply() {
    // 	this.center = latLng(this.lat, this.lng);
    // 	this.zoom = this.formZoom;
    // }
}
