import { RideService } from 'src/app/services/ride.service';
import { AuthService } from './auth.service';
import { MapsMarkerService } from './business/maps-marker.service';
import { OrderService } from './order.service';
import { UserService } from './user.service';

export const services: any[] = [
    AuthService,
    UserService,
    RideService,
    OrderService,
    MapsMarkerService
];

export * from './auth.service';
export * from './business/maps-marker.service';
export * from './ride.service';
export * from './user.service';

