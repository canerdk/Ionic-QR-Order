import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {MenuController} from "@ionic/angular";
import {AuthService} from "../../Services/auth.service";
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-cook',
    templateUrl: './cook.page.html',
    styleUrls: ['./cook.page.scss'],
})
export class CookPage implements OnInit {
    selectedId: string;
    orders: any;
    selectedTabs: any = "orders";
    time: any;
    example: any;
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
        this.time = formatDate(new Date(), 'yyyy/MM/dd h:m:s', 'en');
        this.menu.enable(false);
        //Get id from url
        this.route.paramMap.subscribe(params => {
            let id = params.get('id');
            this.selectedId = id
        });
        this.service.getOrdersCook(this.selectedId).subscribe(data => {
            this.orders = data['value'];
            this.confirmed = this.orders.filter(item => item.Confirmation === true && item.PrepareState === 0);
            this.preparing = this.orders.filter(item => item.PrepareState === 1);
            this.prepared = this.orders.filter(item => item.PrepareState === 2 && item.Complete === false);
        });

        setInterval(() => {
            this.service.getOrdersCook(this.selectedId).subscribe(data => {
                this.orders = data['value'];
                this.confirmed = this.orders.filter(item => item.Confirmation === true && item.PrepareState === 0);
                this.preparing = this.orders.filter(item => item.PrepareState === 1);
                this.prepared = this.orders.filter(item => item.PrepareState === 2 && item.Complete === false);
            });
        }, 5000)
    }



    getDataDiff(startDate, endDate) {
        let diff = endDate.getTime() - startDate.getTime();
        let days = Math.floor(diff / (60 * 60 * 24 * 1000));
        let hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
        let minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
        return {minute: minutes};
    }


    getDetail(id) {
        this.router.navigate(['cookdetails', id]);
    }

}
