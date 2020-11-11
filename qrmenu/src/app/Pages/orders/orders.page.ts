import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {MenuController} from "@ionic/angular";
import {AuthGuard} from "../../Services/auth-guard.service";
import {AuthService} from "../../Services/auth.service";
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
    providers: [AuthGuard, AuthService]
})
export class OrdersPage implements OnInit {

    selectedId: string;
    orders: any;
    selectedTabs: any = "orders";
    time: any;
    date: any;
    current: any;
    confirmed: any;
    preparing: any;
    prepared: any;

    constructor(
        private route: ActivatedRoute,
        private service: Service,
        private menu: MenuController,
        private router: Router,
        private authGuard: AuthService
    ) {
    }

    ngOnInit() {
        this.menu.enable(false);
        //Get id from url
        this.route.paramMap.subscribe(params => {
            let id = params.get('id');
            this.selectedId = id
        });
        this.service.getOrders(this.selectedId).subscribe(data => {
            this.orders = data['value'];
            this.current = this.orders.filter(item => item.Confirmation === false);
            this.confirmed = this.orders.filter(item => item.Confirmation === true && item.PrepareState === 0);
            this.preparing = this.orders.filter(item => item.PrepareState === 1);
            this.prepared = this.orders.filter(item => item.PrepareState === 2 && item.Complete === false);
        });
        setInterval(() => {
            this.service.getOrders(this.selectedId).subscribe(data => {
                this.orders = data['value'];
                this.current = this.orders.filter(item => item.Confirmation === false);
                this.confirmed = this.orders.filter(item => item.Confirmation === true && item.PrepareState === 0);
                this.preparing = this.orders.filter(item => item.PrepareState === 1);
                this.prepared = this.orders.filter(item => item.PrepareState === 2 && item.Complete === false);
            });
        }, 5000)
        this.date = formatDate(new Date(), 'yyyy/MM/dd h:m:s', 'en');
        this.time = formatDate(new Date(), 'h:m:s', 'en');

    }


    getDetail(id) {
        this.router.navigate(['orderdetails', id]);
    }

}
