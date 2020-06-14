import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../auth.actions';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: "auth-logon",
  templateUrl: './logon.component.html',
  styleUrls: ["./logon.component.scss"]
})
export class LogonComponent implements OnInit {
  logonForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<any>
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.authTokenValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.logonForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.logonForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.logonForm.invalid) {
      return;
    }

    this.store.dispatch(
      login({
        userName: this.f.username.value,
        password: this.f.password.value,
      })
    );
  }
}
