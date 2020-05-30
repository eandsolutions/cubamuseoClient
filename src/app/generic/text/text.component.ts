import { ConfigServiceService } from './../../core/service/config-service.service';
import { EnviromentVariableServiceService } from './../../core/service/enviroment-variable-service.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SamplesServiceService } from './../../core/service/samples-service.service';
import { CollectionServiceService } from './../../core/service/collection-service.service';
import { TalesServiceService } from './../../core/service/tales-service.service';
import { StoreServiceService } from './../../core/service/store-service.service';
import { AlertService } from './../../alert/alert.service';
import { VpostServiceService } from './../../core/service/vpost-service.service';


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  sectionId: number;
  itemId: number;
  category: any;
  pages: any;
  mySubscription: any;
  section: any;
  level: number;
  fatherLevel: number;
  father: any;
  baseFolder: string;

  constructor(private activatedRoute: ActivatedRoute,
    private collection: CollectionServiceService,
    private samples: SamplesServiceService,
    private tales: TalesServiceService,
    private vPost: VpostServiceService,
    private store: StoreServiceService,
    private alerts: AlertService,
    private router: Router,
    private enviromentVariables: EnviromentVariableServiceService,
    public configService: ConfigServiceService) {
    this.level = -1;


    this.activatedRoute.params.subscribe(val => {
      this.sectionId = val.id;
      this.category = val.section;
      this.fatherLevel = val.level;
      this.father = val.component;
      this.baseFolder = val.baseFolder
      this.enviromentVariables.setLevel(this.fatherLevel, this.father, this.category);
      this.initContent();
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };

      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
    });



  }

  getLevel() {
    let data = window.localStorage['level'];
    if (data) {
      console.log(data);
      data = JSON.parse(data);
      this.level = data;
    }
  }

  initContent() {
    this.getLevel();
    if (this.level === 2) {
      this.getSectionById();
    }
    else if (this.category === 'collection') {
      if (this.level === 1)
        this.getCategoryById();
      else if (this.level === 3)
        this.getSectionById();
    }
    else {
      this.getSampleById();
    }

  }



  getSectionById() {
    this.collection.getSectionById(this.sectionId).subscribe(
      data => {
        this.section = data;
      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }

  getCategoryById() {
    this.collection.getCategoryById(this.sectionId).subscribe(
      data => {
        this.section = data;
      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }

  getSampleById() {
    this.samples.getSampleById(this.sectionId).subscribe(
      data => {
        this.section = data;
      }, error => {
        this.alerts.error('Ha ocurrido un error verifique la conexion', 'error');
      }
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }




}
