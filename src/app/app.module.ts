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
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {IngredientService} from './ingredient/shared/ingredient.service';
import {NgbModule, NgbRadioGroup} from '@ng-bootstrap/ng-bootstrap';
import {NgbButtonLabel} from '@ng-bootstrap/ng-bootstrap/buttons/label';


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
  },
  { path: 'shopping-list',
    component: ShoppingListComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AllergyComponent,
    ProductListComponent,
    ShoppingListComponent,
    LoginComponent,
    ProductAdministrationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ProductService, IngredientService, FormBuilder, NgbRadioGroup, NgbButtonLabel],
  bootstrap: [AppComponent]
})
export class AppModule { }
