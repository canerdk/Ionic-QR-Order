import {Component, OnInit} from '@angular/core';
import {
    LoadingController,
    MenuController,
    ModalController,
    NavController,
    Platform,
    ToastController
} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Service} from "../../Services/service";
import {MUser} from "../../Model/MUser";
import {catchError} from "rxjs/operators";
import {AuthService} from "../../Services/auth.service";
import {OneSignal} from "@ionic-native/onesignal/ngx";
import {MPlayers} from "../../Model/MPlayers";
import * as uuid from 'uuid';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    Username: string = "";
    Password: string = "";
    Users: any;
    playerId: any;
    players: any;
    isCheck: any = false;

    constructor(public loadingController: LoadingController,
                private router: Router,
                private service: Service,
                private  menu: MenuController,
                public toastController: ToastController,
                private authService: AuthService,
                private onesignal: OneSignal
    ) {}




    ngOnInit() {
        this.menu.enable(false);
        this.Username = localStorage.getItem('username');
        this.Password = localStorage.getItem('pw');
    }

    async Signin() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            spinner: "bubbles"
        });
        await loading.present();

        if (this.Username !== "" && this.Password !== "") {
            this.service.getUsers(this.Username, this.Password).subscribe(async data => {
                this.Users = data['value'];
                if (this.Users.length === 0){
                    const toast = await this.toastController.create({
                        message: 'Wrong username or password.',
                        duration: 2000,
                        color: "danger"
                    });
                    await loading.dismiss();
                    await toast.present();
                }else if (this.Users[0].UserType === 0){
                    // When user logged in, we got playerId from OneSignal
                    this.onesignal.getIds().then((id) => {
                        this.playerId = id.userId;
                        this.getPlayers(this.playerId, this.Users[0].Username);
                    });
                    this.authService.login();
                    await loading.dismiss();
                    this.router.navigate(['orders', this.Users[0].Customers]);
                }else{
                    // When user logged in, we got playerId from OneSignal
                    this.onesignal.getIds().then((id) => {
                        this.playerId = id.userId;
                        this.getPlayers(this.playerId, this.Users[0].Username);
                    });
                    this.authService.login();
                    await loading.dismiss();
                    this.router.navigate(['cook', this.Users[0].Customers]);
                }
            });

        } else {
            const toast = await this.toastController.create({
                message: 'Please fill in the required fields.',
                duration: 2000,
                color: "warning"
            });
            await  loading.dismiss();
            await toast.present();
        }
    }

    getPlayers(playerId, username){
        this.service.getPlayer(playerId).subscribe((data)=>{
            this.players = data['value'];
            if (this.players.length === 0){
                const obj = {
                    Oid: uuid.v4(),
                    PlayerId: playerId,
                    Username: username
                }
                this.service.postPlayer(obj);
            }
        });
    }

    rememberMe(){
        if (this.isCheck === true){
            localStorage.setItem('username', this.Username);
            localStorage.setItem('pw', this.Password);
        }else{
            localStorage.clear();
        }
    }



}
