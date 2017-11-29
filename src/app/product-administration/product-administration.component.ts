import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';




@Component({
  selector: 'app-product-administration',
  templateUrl: './product-administration.component.html',
  styleUrls: ['./product-administration.component.css']
})
export class ProductAdministrationComponent implements OnInit {
  productGroup: FormGroup;
  productToDelete: Product;
  product: Product;
  products: Product[];
  constructor(private productService: ProductService,
              private router: Router,
              private fb: FormBuilder) {
    this.productGroup = this.fb.group({
      name: [''],
      type: [''],
    });
  }


  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
        }
      );
  }

  delete(product: Product, $event) {
    console.log('product', product);
    this.productService.deleteProductById(
      product.id).switchMap(productDeleted => this.productService.getProducts())
      .subscribe(
        products => {
          this.products = products;
        }, error2 => {}
      );
    $event.stopPropagation();
  }

  createCustomer() {

    const values = this.productGroup.value;
    const product: Product = {
      name: values.name,
      type: values.type,
    };
    this.productService.createProduct(product)
      .subscribe(returnproduct => {
        this.products.push(returnproduct);
        this.productGroup.reset();
      });
  }

}
