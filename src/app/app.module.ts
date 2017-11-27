import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import {ProductService} from './shared/product.service';
import {ProductComponent} from './product/product.component';


const appRoutes: Routes = [
  { path: 'product',
    component: ProductComponent },
  { path: '',
    redirectTo: '/product',
    pathMatch: 'full'
    }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
