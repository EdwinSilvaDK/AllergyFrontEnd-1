import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {Product} from '../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router) { }
  product: Product;
  products: Product[];

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
        }
      );
  }
  backToAllergies() {
    this.router.navigateByUrl('/allergy');
  }
  toShoppingList() {
    this.router.navigateByUrl('/shopping-list');
  }
  addProduct(name: string) {
     return this.productService.addToShoppingList(name);
  }
}
