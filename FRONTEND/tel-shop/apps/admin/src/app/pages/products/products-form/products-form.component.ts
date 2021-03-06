import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService } from "@bluebits/products";

@Component({
  selector: "admin-products-form",
  templateUrl: "./products-form.component.html",
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  isSubmitted = false;
  form: FormGroup;
  categories = [];
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
    ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      countInStock: ["", Validators.required],
      description: ["", Validators.required],
      richDescription: ["", Validators.required],
      image: ["", Validators.required],
      isFeatured: [""],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  get productForm() {
    return this.form.controls;
  }
}
