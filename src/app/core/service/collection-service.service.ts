import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionServiceService {
  collectionList: any;
  collectionCategoryList: any;
  collectionPagesList: any;

  constructor(public http: HttpClient, private config: ConfigServiceService) {
    this.collectionList = [];
    this.collectionCategoryList = [];
    this.collectionPagesList = [];
   }
   //Texto e imagen de inicio de las colecciones
   getCollectionHome(id) {
    return this.http.get(this.config.serverNodeLocation + 'text/' + id);
  }

   getCollectionById(id) {
     return this.http.get(this.config.serverNodeLocation + 'api/collection/getOne/' + id);
   }


   getItem(id){
    return this.http.get(this.config.serverNodeLocation + 'api/collection/getItem/' + id);
   }

   getImage(id){
    return this.http.get(this.config.serverNodeLocation + 'api/collection/getItemImage/' + id);
   }


   getCollections(offset, id) {
     return this.http.post(this.config.serverNodeLocation + 'api/collection/getWith', {id, offset});
   }

   getCollectionPageById(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/collection/getOnePage/' + id);
  }

  getCollectionPages(offset, id) {
    return this.http.post(this.config.serverNodeLocation + 'api/collection/getPagesWith', {id, offset});
  }

  getCollectionCategoryById(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/collection/getOneCategory/' + id);
  }

  
  getCollectionsCategories() {
    return this.http.get(this.config.serverNodeLocation + 'section');
  }
}
