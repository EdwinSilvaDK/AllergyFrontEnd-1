import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
  }
  productsById() {
    this.router.navigateByUrl('/allergy');
  }
}
