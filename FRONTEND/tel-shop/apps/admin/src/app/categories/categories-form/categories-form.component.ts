import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@tel-shop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;
  editMode = false;
  currentCategoryId!: string;
  constructor(
    private messageService: MessageService, 
    private formBulder: FormBuilder, 
    private categoriesServices: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.formBulder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.CategoryForm.name.value,
      icon: this.CategoryForm.icon.value,
      color: this.CategoryForm.color.value
    }
    if (this.editMode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }
    
  }

  private _addCategory(category: Category) {
    this.categoriesServices.createCategory(category).subscribe((category: Category) => {
      this.messageService.add({severity:'success', summary:'Success', detail:`Category ${category.name} is created`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    },
    () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created'});
    }
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesServices.updateCategory(category).subscribe(() => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Category is updated'});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    },
    () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not updated'});
    }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesServices.getCategory(params.id).subscribe(category => {
          this.CategoryForm.name.setValue(category.name);
          this.CategoryForm.icon.setValue(category.icon);
          this.CategoryForm.color.setValue(category.color);
        })
      }
    })
  }

  get CategoryForm() {
    return this.form.controls;
  }

}
