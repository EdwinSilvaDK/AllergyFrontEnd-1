
import {Ingredient} from '../ingredient/shared/ingredient.model';

export class Product {
id?: number;
name: string;
type: string;
ingredients?: Ingredient[];
}
