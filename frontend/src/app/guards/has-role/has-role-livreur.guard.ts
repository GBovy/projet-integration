import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserRole } from '../../models/enums/user-role.enum';

@Injectable()
export class HasRoleLivreurGuard {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.getCurrentUser()
            .pipe(
                map(user => {
                    if (user.userRole !== UserRole.LIVREUR) {
                        this.router.navigate(['/products']);
                    }
                    return true;
                })
            );
    }
}
