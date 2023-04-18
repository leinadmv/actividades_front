import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { _closeLegacyDialogVia } from '@angular/material/legacy-dialog';
import { Credentials } from 'src/app/models/model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;

  creds: Credentials = {
    user: '',
    password: ''
  }

  constructor(private authService: AuthService) { }

  get error(): any {return this.loginForm.controls;}

  ngOnInit() {
    this.formControl();
  }

  formControl(){
    this.loginForm = new FormGroup({
			user: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
			password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)])
		});
  }

  loginAuth(loginForm: FormGroup){

    this.creds.user = loginForm.value.user;
    this.creds.password = loginForm.value.password;

    this.authService.autenticarse(this.creds).subscribe(
    (resp) =>{
      console.log(resp);
    },
    (error) =>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña invalidos!',
      })
    }
    );

  }

}
