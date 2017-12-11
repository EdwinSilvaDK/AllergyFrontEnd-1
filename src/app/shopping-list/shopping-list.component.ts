import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/product.model';
import {Router} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private fb: FormBuilder) {
    this.productGroup = this.fb.group({
      name: [''],
      type: [''],
    });
  }

  shoppingList: Array<string> = [];
  product: Product;
  productGroup: FormGroup;

  ngOnInit() {
    this.shoppingList = this.productService.getShoppingList();
  }

  backToAllergies() {
    this.router.navigateByUrl('/allergy');
  }
  clearProduct() {
    this.productService.DeleteShoppingList();
    this.shoppingList = this.productService.getShoppingList();
  }
  }
