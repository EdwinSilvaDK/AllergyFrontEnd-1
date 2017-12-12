import {Component, OnInit, state} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Ingredient} from '../ingredient/shared/ingredient.model';
import {IngredientService} from '../ingredient/shared/ingredient.service';




@Component({
  selector: 'app-product-administration',
  templateUrl: './product-administration.component.html',
  styleUrls: ['./product-administration.component.css']
})
export class ProductAdministrationComponent implements OnInit {
  productGroup: FormGroup;
  ingredientGroup: FormGroup;
  product: Product;
  products: Product[];
  ingredients: Ingredient[];
  ingredientIdList: Array<number> = [];
  constructor(private productService: ProductService,
              private ingredientService: IngredientService,
              private router: Router,
              private fb: FormBuilder) {
    this.productGroup = this.fb.group({
      name: [''],
      type: [''],
    });
    this.ingredientGroup = this.fb.group({
      name: [''],
    });
  }


  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
        }
      );
    this.ingredientService.getIngredients()
      .subscribe(
        ingredients => {
          this.ingredients = ingredients;
        }
      );
  }
  delete(id: number, $event) {
    console.log('product');
    this.productService.deleteProductById(
      id).switchMap(productDeleted => this.productService.getProducts())
      .subscribe(
        products => {
          this.products = products;
        }, error2 => {}
      );
    $event.stopPropagation();
  }

  addProduct() {
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
  addToIngredients() {
    const values = this.ingredientGroup.value;
    const ingredient: Ingredient = {
      name: values.name,
    };
    this.ingredientService.createIngredient(ingredient)
      .subscribe(returnIngredient => {
        this.ingredients.push(returnIngredient);
        this.ingredientGroup.reset();
      });
  }
  editSpecificProduct(id: number) {
    const values2 = this.productGroup.value;
    const product: Product = {
      name: values2.name,
      type: values2.type,
      id: id,
    };
    this.productService.editProduct(id, product)
      .switchMap(productEdited => this.productService.getProducts())
      .subscribe(
        products => {
          this.products = products;
          this.productGroup.reset();
        }, error2 => {}
      );
  }

  addIngredientToProduct(name: string, type: string, id: number, idIng: number) {
    this.ingredientIdList.push(idIng);
    const product: Product = {
      name: name,
      type: type,
      ingredientIds: this.ingredientIdList,
      id: id,
    };
    this.productService.editProduct(id, product)
      .switchMap(IngredientEdited => this.productService.getProducts())
      .subscribe(products => {
        this.products = products;
      });
    this.ingredientIdList = [];
  }
  backToLogin() {
    this.router.navigateByUrl('/login');
  }

}
