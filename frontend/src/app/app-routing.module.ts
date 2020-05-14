import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductContainerComponent, MyProductsContainerComponent,
    OrderContainerComponent, ProductsContainerComponent, MyMailsContainerComponent } from './components/containers/index';
import { CreateDeliveryComponent, CreateOfferComponent, HomeComponent,
    LoginComponent, MyProductsDeliveryComponent, MyProductsOffersComponent,
    ProfileComponent, RegisterComponent } from './components/index';
import { NotFoundComponent } from './components/interceptors/errors/not-found.component';
import { OrderDeliveryComponent } from './components/views/forms/order/order-delivery/order-delivery.component';
import { OrderOfferComponent } from './components/views/forms/order/order-offer/order-offer.component';
import { ProductsDeliveryComponent } from './components/views/products/products-delivery/products-delivery.component';
import { ProductsOfferComponent } from './components/views/products/products-offer/products-offer.component';
import { IsLoggedGuard } from './guards/is-logged/is-logged.guard';
import { NeedAuthGuard } from './guards/need-auth/need-auth.guard';
import { NeedCompleteProfileGuard } from './guards/need-complete-profile/need-complete-profile.guard';
import { MyProductsOrdersComponent } from './components/views/products/my-products-orders/my-products-orders.component';
import { MyMailsComponent } from './components/views/forms/mails/my-mails/my-mails.component';
 
const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [IsLoggedGuard]
    },
    {
        path: 'products',
        component: ProductsContainerComponent,
        // canActivate: [NeedAuthGuard],
        data: { title: 'List of Products' },
        children: [
            {
                path: '',
                redirectTo: 'offers',
                pathMatch: 'full'
            },
            {
                path: 'delivery',
                component: ProductsDeliveryComponent
            },
            {
                path: 'offers',
                component: ProductsOfferComponent
            }
        ]
    },
    {
        path: 'my-mails',
        component: MyMailsContainerComponent,
        canActivate: [NeedCompleteProfileGuard, NeedAuthGuard],
        data: { title: 'My mails' },
        children: [
            {
                path: '',
                redirectTo: 'mails',
                pathMatch: 'full'
            },
            {
                path: 'mails',
                component: MyMailsComponent
            },
        ]
    },
    {
        path: 'my-products',
        component: MyProductsContainerComponent,
        canActivate: [NeedCompleteProfileGuard, NeedAuthGuard],
        data: { title: 'My list of Products' },
        children: [
            {
                path: '',
                redirectTo: 'offers',
                pathMatch: 'full'
            },
            {
                path: 'delivery',
                component: MyProductsDeliveryComponent
            },
            {
                path: 'offers',
                component: MyProductsOffersComponent
            },
            {
                path: 'orders',
                component: MyProductsOrdersComponent
            }
        ]
    },
    {
        path: 'order',
        component: OrderContainerComponent,
        canActivate: [NeedCompleteProfileGuard, NeedAuthGuard],
        data: { title: 'Order' },
        children: [
            {
                path: '',
                redirectTo: '/products/delivery',
                pathMatch: 'full'
            },
            {
                path: 'offer/:id',
                component: OrderOfferComponent,
                // data: {type: ProductType.OFFER}
            },
            {
                path: 'delivery/:id',
                component: OrderDeliveryComponent,
                // data: {type: ProductType.DELIVERY}
            }
        ]
    },
    {
        path: 'create-product',
        component: CreateProductContainerComponent,
        canActivate: [NeedCompleteProfileGuard, NeedAuthGuard],
        data: { title: 'Create product' },
        children: [
            {
                path: '',
                redirectTo: '/products/delivery',
                pathMatch: 'full'
            },
            {
                path: 'offer',
                component: CreateOfferComponent,
                // data: {type: ProductType.OFFER}
            },
            {
                path: 'delivery',
                // canActivate: [HasRoleLivreurGuard],
                component: CreateDeliveryComponent,
                // data: {type: ProductType.DELIVERY}
            }
        ]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [NeedAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsLoggedGuard],
        data: { title: 'Login' }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [IsLoggedGuard],
        data: { title: 'Register' }
    },
    {
        path: 'errors',
        component: NotFoundComponent,
        data: { title: 'Errors' }
    },
    {
        path: '**',
        redirectTo: '/products/offers'
        // children: [], canActivate: [WrongPathGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
