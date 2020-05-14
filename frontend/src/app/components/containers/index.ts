import { CreateProductContainerComponent } from './products/create-product-container/create-product-container.component';
import { OrderContainerComponent } from './orders/order-container/order-container.component';
import { ManageLitigationContainerComponent } from './litigation/manage-litigation-container/manage-litigation-container.component';
import { FileComplaintContainerComponent } from './litigation/file-complaint-container/file-complaint-container.component';
import { ManageAdminContainerComponent } from './admin/manage-admin-container/manage-admin-container.component';
import { ProductsContainerComponent } from './products/products-container/products-container.component';
import { MyProductsContainerComponent } from './products/my-products-container/my-products-container.component';
import { MyMailsContainerComponent } from './mails/my-mails-container.component';

export const containers: any[] = [
    ProductsContainerComponent,
    CreateProductContainerComponent,
    OrderContainerComponent,
    ManageLitigationContainerComponent,
    FileComplaintContainerComponent,
    ManageAdminContainerComponent,
    MyProductsContainerComponent,
    MyMailsContainerComponent
];

export * from './products/products-container/products-container.component';
export * from './products/create-product-container/create-product-container.component';
export * from './orders/order-container/order-container.component';
export * from './litigation/manage-litigation-container/manage-litigation-container.component';
export * from './litigation/file-complaint-container/file-complaint-container.component';
export * from './admin/manage-admin-container/manage-admin-container.component';
export * from './products/my-products-container/my-products-container.component';
export * from './mails/my-mails-container.component';