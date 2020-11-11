import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ToastController} from "@ionic/angular";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
                private router: Router,
                public toastController: ToastController
    ) {
    }
    canActivate() {
        return this.authService.isAuthenticated().then((authenticated: Boolean)=>{
            if (authenticated){
                return true;
            }else{
                this.showToast();
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
    async showToast(){
        const toast = await this.toastController.create({
            message: 'You must login.',
            duration: 2000,
            color: "danger"
        });
        toast.present();
    }
}