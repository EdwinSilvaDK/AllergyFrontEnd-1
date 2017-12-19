import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {IngredientService} from '../ingredient/shared/ingredient.service';
import {Ingredient} from '../ingredient/shared/ingredient.model';
import {Product} from '../shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private ingredientService: IngredientService) {
  }
  ingredients: Ingredient[];
  selectedIngredients: Array<Ingredient> = [];
  confirmClear= false;
  confirmAdd= false;
  addingToSelectedItems= false;
  ngOnInit() {
    this.ingredientService.getIngredients()
      .subscribe(
        ingredients => {
          this.ingredients = ingredients;
        }
      );
  }
  AddToSelectedIngredientsIds(ingId: number) {
    this.productService.addToFilteredList(ingId);
    this.addingToSelectedItems = true;
    setTimeout(() => {
      this.addingToSelectedItems = false;
    }, 2500);
}
  add() {
    this.confirmAdd = true;
  }

  abortAdd() {
    this.confirmAdd = false;
  }
  productsById() {
      this.router.navigateByUrl('product-list');
  }

  toShoppingList() {
    this.router.navigateByUrl('/shopping-list');
  }

  backToLogin() {
    this.router.navigateByUrl('/login');
  }
  addToExclusiveList(ing: Ingredient) {
    for (let i = 0; i < this.selectedIngredients.length; i++) {
      if (this.selectedIngredients[i] === ing) {
        this.selectedIngredients.push(ing);
      }
    }
    this.selectedIngredients.push(ing);
  }

  clearFromExclusiveList() {
    this.selectedIngredients = [];
    this.confirmClear = false;
  }
  clear() {
    this.confirmClear = true;
  }

  abortClear() {
    this.confirmClear = false;
  }
  closeAlert() {
    this.addingToSelectedItems = false;
  }
}
