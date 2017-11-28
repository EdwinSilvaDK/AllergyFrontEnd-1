import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import {ProductService} from './shared/product.service';
import {AllergyComponent} from './allergy/allergy.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';


const appRoutes: Routes = [
  { path: 'allergy',
    component: AllergyComponent },
  { path: '',
    redirectTo: '/allergy',
    pathMatch: 'full'
    }
];

@NgModule({
  declarations: [
    AppComponent,
    AllergyComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
