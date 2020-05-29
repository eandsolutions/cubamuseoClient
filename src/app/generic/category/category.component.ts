import { EnviromentVariableServiceService } from './../../core/service/enviroment-variable-service.service';
import { AlertService } from './../../alert/alert.service';
import { StoreServiceService } from './../../core/service/store-service.service';
import { VpostServiceService } from './../../core/service/vpost-service.service';
import { TalesServiceService } from './../../core/service/tales-service.service';
import { SamplesServiceService } from './../../core/service/samples-service.service';
import { CollectionServiceService } from './../../core/service/collection-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: any[];
  category: string;
  fatherLevel: number;
  father: 'start';
  level: number;
  section: any;
  component: 'category';


  @Input() categoryType: Subject<string>;



  constructor(private collection: CollectionServiceService, private samples: SamplesServiceService,
    private tales: TalesServiceService, private vPost: VpostServiceService,
    private store: StoreServiceService, private alerts: AlertService, private enviromentVariables: EnviromentVariableServiceService) {

    this.categoryList = [];
    this.category = 'collection';

    this.enviromentVariables.setLevel(this.fatherLevel, this.father, this.section);

  }

  getSection() {

    this.section = this.category;

  }

  getFatherLevel() {
    if (this.categoryType)

      if (this.category === "collection" || this.category === "samples") {
        this.fatherLevel = 4;
      }
      else {
        this.fatherLevel = 3;
      }

  }

  getLevel() {
    let data = window.localStorage['level'];
    if (data) {
      data = JSON.parse(data);
      this.level = data;
    }
  }

  initCategories() {

    switch (this.category) {
      case "collection": {
        return this.getCategoryListCollection();
      }
      case "samples": {
        return this.getCategoryListSamples();
      }
      case "tale": {
        return this.getCategoryListTales();
      }
      case "vpost": {
        return this.getCategoryListVpost();
      }
      case "store": {
        return this.getCategoryListStore();
      }
    }

  }

  getCategoryListCollection() {
    this.collection.getCollectionsCategories().subscribe(
      data => {
        let result: any = data;
        this.categoryList = [];
        this.collection.collectionCategoryList = [];

        result.forEach(element => {
          this.categoryList.push(element);
          this.collection.collectionCategoryList.push(element);
        });

      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }

  getCategoryListSamples() {
    this.samples.getSamplesCategories().subscribe(
      data => {
        let result: any = data;
        this.categoryList = [];
        this.samples.samplesCategoryList = [];

        result.forEach(element => {
          this.categoryList.push(element);
          this.samples.samplesCategoryList.push(element);
        });

      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }
  getCategoryListTales() {
    this.tales.getTalesCategories().subscribe(
      data => {
        let result: any = data;
        this.categoryList = [];
        this.tales.taleCategoryList = [];

        result.forEach(element => {
          this.categoryList.push(element);
          this.tales.taleCategoryList.push(element);
        });

      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }
  getCategoryListVpost() {
    this.vPost.getVpostCategories().subscribe(
      data => {
        let result: any = data;
        this.categoryList = [];
        this.vPost.vpostCategoryList = [];

        result.forEach(element => {
          this.categoryList.push(element);
          this.vPost.vpostCategoryList.push(element);
        });

      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }
  getCategoryListStore() {
    this.store.getAdsCategories().subscribe(
      data => {
        let result: any = data;
        this.categoryList = [];
        this.store.storeCategoryList = [];

        result.forEach(element => {
          this.categoryList.push(element);
          this.store.storeCategoryList.push(element);
        });

      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }

  ngOnInit(): void {

    this.categoryType.subscribe(
      data => {
        this.category = data;
        this.initCategories();
        this.getFatherLevel();
        this.getSection();
        console.log(this.category);
      }
    );

    this.initCategories();
    this.getFatherLevel();
    this.getSection();


    this.getLevel();
  }

}