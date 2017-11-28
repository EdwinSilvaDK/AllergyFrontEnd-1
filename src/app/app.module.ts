import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import {ProductService} from './shared/product.service';
import {AllergyComponent} from './allergy/allergy.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductListComponent } from './product-list/product-list.component';

import { LoginComponent } from './login/login.component';
import { ProductAdministrationComponent } from './product-administration/product-administration.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';


const appRoutes: Routes = [
  { path: 'allergy',
    component: AllergyComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent },
  {
    path: 'product-administration',
    component: ProductAdministrationComponent},
  { path: 'product-list',
    component: ProductListComponent,
    data: { title: 'Product List' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AllergyComponent,
    ProductListComponent,
    LoginComponent,
    ProductAdministrationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
