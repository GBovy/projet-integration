import { ManageAdminComponent } from './admin/manage-admin/manage-admin.component';
import { ManageFleetComponent } from './admin/manage-fleet/manage-fleet.component';
import { CreateDeliveryComponent } from './forms/create-products/create-delivery/create-delivery.component';
import { CreateOfferComponent } from './forms/create-products/create-offer/create-offer.component';
import { DeliveryValidationComponent } from './forms/delivery-validation/delivery-validation.component';
import { LoginComponent } from './forms/login/login.component';
import { OrderDeliveryComponent } from './forms/order/order-delivery/order-delivery.component';
import { OrderOfferComponent } from './forms/order/order-offer/order-offer.component';
import { ProfileComponent } from './forms/profile/profile.component';
import { RegisterComponent } from './forms/register/register.component';
import { HomeComponent } from './home/home.component';
import { FileComplaintComponent } from './litigation/file-complaint/file-complaint.component';
import { ManageLitigationComponent } from './litigation/manage-litigation/manage-litigation.component';
import { ProductsDeliveryComponent } from './products/products-delivery/products-delivery.component';
import { ProductsOfferComponent } from './products/products-offer/products-offer.component';
import { MyProductsOffersComponent } from './products/my-products-offers/my-products-offers.component';
import { MyProductsDeliveryComponent } from './products/my-products-delivery/my-products-delivery.component';
import { OrderModalComponent } from './forms/order/order-modal/order-modal.component';
import { MyProductsOrdersComponent } from './products/my-products-orders/my-products-orders.component';
import { MyMailsComponent } from './forms/mails/my-mails/my-mails.component';

export const views: any[] = [
    HomeComponent,
    ProductsOfferComponent,
    ProductsDeliveryComponent,
    OrderOfferComponent,
    OrderDeliveryComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DeliveryValidationComponent,
    ManageFleetComponent,
    ManageLitigationComponent,
    FileComplaintComponent,
    ManageAdminComponent,
    CreateOfferComponent,
    CreateDeliveryComponent,
    MyProductsOffersComponent,
    MyProductsDeliveryComponent,
    MyProductsOrdersComponent,
    OrderModalComponent,
    MyMailsComponent
];

export * from './admin/manage-admin/manage-admin.component';
export * from './admin/manage-fleet/manage-fleet.component';
export * from './forms/create-products/create-delivery/create-delivery.component';
export * from './forms/create-products/create-offer/create-offer.component';
export * from './forms/delivery-validation/delivery-validation.component';
export * from './forms/login/login.component';
export * from './forms/order/order-delivery/order-delivery.component';
export * from './forms/order/order-offer/order-offer.component';
export * from './forms/profile/profile.component';
export * from './forms/register/register.component';
export * from './home/home.component';
export * from './litigation/file-complaint/file-complaint.component';
export * from './litigation/manage-litigation/manage-litigation.component';
export * from './products/products-delivery/products-delivery.component';
export * from './products/products-offer/products-offer.component';
export * from './products/my-products-offers/my-products-offers.component';
export * from './products/my-products-delivery/my-products-delivery.component';
export * from './products/my-products-orders/my-products-orders.component';
export * from  './forms/mails/my-mails/my-mails.component';

