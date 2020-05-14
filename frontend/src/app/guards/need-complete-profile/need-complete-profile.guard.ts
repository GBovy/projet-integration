import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class NeedCompleteProfileGuard {
    constructor(private router: Router,
        private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.isProfileCompleted()
            .pipe(
                map(isProfileCompleted => {
                    if (!isProfileCompleted) {
                        this.router.navigate(['/profile']);
                    }
                    return isProfileCompleted;
                })
            );
    }
}
