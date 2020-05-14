import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IsLoggedGuard implements CanActivate {

    constructor(private router: Router,
        private authenticationService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.isConnected()
            .pipe(
                map(isConnected => {
                    if (isConnected) {
                        this.router.navigate(['/profile']);
                        return false;
                    }
                    return true;
                })
            );
    }
}
