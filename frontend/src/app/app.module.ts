import { HasRoleLivreurGuard } from './guards/has-role/has-role-livreur.guard';
import { MapsComponent } from './utils/components/maps/maps.component';
import { FileUploadComponent } from './utils/components/file-upload/file-upload.component';
import { NeedCompleteProfileGuard } from './guards/need-complete-profile/need-complete-profile.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
    MatProgressSpinnerModule, MatSidenavModule, MatSortModule, MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressBarModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { components, containers, views } from './components/index';
import { authenticationInterceptorProvider } from './components/interceptors/token.interceptor';
import { services } from './services';
import { NotFoundComponent } from './components/interceptors/errors/not-found.component';
import { NeedAuthGuard } from './guards/need-auth/need-auth.guard';
import { IsLoggedGuard } from './guards/is-logged/is-logged.guard';
import { NgxUploaderModule } from 'ngx-uploader';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CurrencyFormatPipe } from './utils/pipes/currency-format/currency-format.pipe';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { InputCurrencyComponent } from './utils/components/input-currency/input-currency.component';

import { NgxStripeModule } from 'ngx-stripe';
import { OrderModalComponent } from './components/views/forms/order/order-modal/order-modal.component';
import { environment } from 'src/environments/environment';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

export const ngxMaskOptions: Partial<IConfig> = {};

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        ...views,
        ...containers,
        ...components,
        FileUploadComponent,
        CurrencyFormatPipe,
        MapsComponent,
        InputCurrencyComponent
    ],
    imports: [
        NgxMaskModule.forRoot(ngxMaskOptions),
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgxUploaderModule,
        NgxWebstorageModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatProgressBarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LeafletModule.forRoot(),
        NgxStripeModule.forRoot(environment.stripePublicKey)
    ],
    providers: [
        NeedAuthGuard,
        IsLoggedGuard,
        NeedCompleteProfileGuard,
        HasRoleLivreurGuard,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TokenInterceptor,
        //     multi: true
        // },
        authenticationInterceptorProvider,
        ...services
    ],
    bootstrap: [AppComponent],
    entryComponents: [OrderModalComponent]
})
export class AppModule {}
