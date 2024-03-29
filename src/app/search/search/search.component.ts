import { ScrollEvent } from 'ngx-scroll-event';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { SearchServiceService } from './../../core/service/search-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', './search.component.scss']
})


export class SearchComponent implements OnInit {

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event: Event) {
    let srcElement: any = $event.srcElement
    let scrollOffset = srcElement.children[0].scrollTop;
    let max = document.documentElement.scrollHeight;
    if (scrollOffset >= (max - 1000)) {
      this.hScroll();
    }
  }

  query: string;
  isCollection: boolean;
  isModel: boolean;
  isStamp: boolean;
  isVPost: boolean;
  isShop: boolean;

  shopList: any[];
  collectionList: any[];
  modelList: any[];
  stampList: any[];
  vpostList: any[];

  limitCollection: number;
  limitStamp: number;
  limitModel: number;
  limitShop: number;

  actualTab: string;

  constructor(private activatedRoute: ActivatedRoute,
    private searchService: SearchServiceService,
    public config: ConfigServiceService
  ) {

    this.isCollection = true;
    this.isModel = true;
    this.isStamp = true;
    this.isVPost = false;
    this.isShop = false;

    this.shopList = [];
    this.collectionList = [];
    this.modelList = [];
    this.stampList = [];
    this.vpostList = [];

    this.limitCollection = 10;
    this.limitModel = 10;
    this.limitStamp = 10;
    this.limitShop = 10;

    this.actualTab = 'collection';

    this.query = "";

    this.activatedRoute.params.subscribe(val => {
      if (val.query) {
        this.query = val.query;
        this.search()
      }
    });
  }

  ngOnInit(): void {

  }

  search() {
    this.searchInShop();
    this.searchInStamp();
    this.searchInModel();
    this.searchIInCollectionsSection();
  }

  searchInShop() {
    this.shopList = [];
    this.searchService.findInShop(this.query).subscribe(
      (data: any[]) => {
        data.forEach(element => {
          this.shopList.push(element)
        });
      }, error => {

      }
    )
  }

  searchInText() {
    this.searchService.findInText(this.query).subscribe(
      (data: any[]) => {
        data.forEach(element => {

        });
      }, error => {

      }
    )
  }

  searchInModel() {
    this.modelList = [];
    if (this.isModel)
      this.searchService.findInModel(this.query).subscribe(
        (data: any[]) => {
          data.forEach(element => {
            this.modelList.push(element);
          });
          console.log(this.modelList)
        }, error => {

        }
      )
  }

  searchInStamp() {
    this.stampList = [];
    if (this.isStamp)
      this.searchService.findInStamp(this.query).subscribe(
        (data: any[]) => {
          data.forEach(element => {
            this.stampList.push(element);
          });
        }, error => {

        }
      )
  }

  searchInCollectionsCategory() {
    if (this.isCollection)
      this.searchService.findInCollectionsCategory(this.query).subscribe(
        (data: any[]) => {
          data.forEach(element => {
            this.collectionList.push(element)
          });
        }, error => {

        }
      )
  }

  searchIInCollectionsSection() {
    this.collectionList = [];
    if (this.isCollection)
      this.searchService.findInCollectionsSection(this.query).subscribe(
        (data: any[]) => {
          data.forEach(element => {
            this.collectionList.push(element);
          });
          this.searchInCollectionsCategory();
        }, error => {

        }
      )
  }

  cleanString(data: string) {
    let res = "";
    let finded = false;
    if (data) {
      res = data;
      console.log('busco');
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if (element.toLowerCase() == this.query[0].toLowerCase()) {
          let part = res.slice(i, i + this.query.length)
          if (part.toLowerCase() == this.query.toLowerCase()) {
            if (i > 20) {
              finded = true;
              res = res.slice(this.findWhiteSpaceAfter(i, res), i + 200).replace(part, '<span style="color: #ffda43">' + part + '</span>')
              break;
              //res = res.replace(part,'<span>' + part + '</span>')
            }
            else{
              finded = true;
              res = res.slice(i, this.findWhiteSpaceAfter(250, res)).replace(part, '<span style="color: #ffda43">' + part + '</span>');
              break;
            }
              
            //res = res.replace(part,'<span>' + part + '</span>')
          }
        }
      }

      if(!finded)
        res = res.slice(0, this.findWhiteSpaceAfter(250, res));

    }

    return res;
  }

  findWhiteSpaceAfter(actualPoss, text) {
    let poss = 0;
    for (let i = actualPoss; i > 0; i--) {
      const element = text[i];
      if (element == " ") {
        poss = i;
        break;
      }
    }
    return poss;
  }

  hScroll() {

    if (this.actualTab == 'collection') {
      if ((this.collectionList.length - this.limitCollection) > 0) {
        if ((this.collectionList.length - this.limitCollection) <= 10)
          this.limitCollection += this.collectionList.length - this.limitCollection;
        else
          this.limitCollection += 10;
      }
    } else if (this.actualTab == 'stamp') {
      if ((this.stampList.length - this.limitStamp) > 0) {
        if ((this.stampList.length - this.limitStamp) <= 10)
          this.limitStamp += this.stampList.length - this.limitStamp
        else
          this.limitStamp += 10;
      }
    } else if (this.actualTab == 'model') {
      if ((this.modelList.length - this.limitModel) > 0) {
        if ((this.modelList.length - this.limitModel) <= 10)
          this.limitModel += this.modelList.length - this.limitModel
        else
          this.limitModel += 10;
      }
    } else if (this.actualTab == 'shop') {
      if ((this.shopList.length - this.limitShop) > 0) {
        if ((this.shopList.length - this.limitShop) <= 10)
          this.limitShop += this.shopList.length - this.limitShop;
        else
          this.limitShop += 10;
      }
    }


  }



}
