import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MUser} from "../Model/MUser";
import {MCustomer} from "../Model/MCustomer";
import {MOrderMain} from "../Model/MOrderMain";
import {MOrder} from "../Model/MOrder";
import {MPlayers} from "../Model/MPlayers";

@Injectable({
    providedIn: 'root'
})

export class Service {
    orderMain: MOrderMain[];
    Base_URL = 'http://serviceaksular.duloriaqrmenuapp.com/odata/';
    // Base_URL = 'http://localhost:58170/odata/';

    constructor(private http: HttpClient) { }

    getUsers(username: string , password: string):Observable<MUser[]>{
        return this.http.get<MUser[]>(this.Base_URL + 'MobileUsers?Username='+username+'&Password=' + password);
    }

    getOrders(id):Observable<MOrderMain[]>{
        return this.http.get<MOrderMain[]>(this.Base_URL + 'Customers('+ id + ')/OrderMain?$expand=Orders');
    }
    getOrdersCook(id):Observable<MOrderMain[]>{
        return this.http.get<MOrderMain[]>(this.Base_URL + 'Customers('+ id + ')/OrderMain?$expand=Orders');
    }

    getOrderDetails(id):Observable<MOrder[]>{
        return this.http.get<MOrder[]>(this.Base_URL + 'OrderMain('+ id + ')/Orders');
    }

    getPlayer(playerId):Observable<MPlayers[]>{
        return this.http.get<MPlayers[]>(this.Base_URL + 'Players?playerid=' + playerId);
    }


    postPlayer(player){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(this.Base_URL + 'Players', player, {headers: headers}).toPromise();
    }

    getOrderDetails1(id):Observable<MOrder[]>{
        return this.http.get<MOrder[]>(this.Base_URL + 'OrderMain('+ id + ')/Orders?$expand=OrdersOrderses_IngredientIngredients($expand=Ingredient)');
    }

    getSingleOrder(id):Observable<MOrderMain[]>{
        return this.http.get<MOrderMain[]>(this.Base_URL + 'OrderMain('+ id + ')');
    }
    updateOrder(orderMain){
        console.log(orderMain);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.patch<void>(this.Base_URL + 'OrderMain('+ orderMain.Oid + ')' ,orderMain, {headers: headers}).toPromise();
    }
    updateOrderDetail(orderDetail){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.patch<void>(this.Base_URL + 'Orders('+ orderDetail.Oid + ')' ,orderDetail, {headers: headers}).toPromise();
    }

}
