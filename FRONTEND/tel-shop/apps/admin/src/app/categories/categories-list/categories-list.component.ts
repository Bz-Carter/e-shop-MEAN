import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from "@tel-shop/products";

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories : Category[] = [];

  constructor(private categoriesServices: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesServices.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }

}
