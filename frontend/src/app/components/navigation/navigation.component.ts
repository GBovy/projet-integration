import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { USER_ROLE } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

export const LANG = 'lang';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    public otherLang: string;

    public get userRoleLivreur() {
        return this.getUserRole() === UserRole.LIVREUR;
    }

    constructor(
        public authService: AuthService,
        private localStorage: LocalStorageService,
        private translateService: TranslateService,
        private router: Router
    ) {
        this.initLang(translateService);
    }

    ngOnInit() {
        this.translateService.onLangChange.subscribe(() => {
            this.setOtherLang();
        });
        this.setOtherLang();
    }

    public logout() {
        this.authService.logout().subscribe(res => {
            this.router.navigate(['login']);
            window.location.reload();
        });
    }

    public switchLang() {
        this.localStorage.store(LANG, (this.translateService.currentLang === 'fr' ? 'en' : 'fr'));
        this.translateService.use(this.localStorage.retrieve(LANG));
    }

    public getUserRole() {
        return localStorage.getItem(USER_ROLE);
    }

    private initLang(translate: TranslateService) {
        this.localStorage.retrieve(LANG) ?
            translate.use(this.localStorage.retrieve(LANG))
            : (this.localStorage.store(LANG, 'fr'), translate.use(this.localStorage.retrieve(LANG)));
    }

    private setOtherLang() {
        this.otherLang = (this.translateService.currentLang === 'fr' ? 'EN' : 'FR');
    }

}
