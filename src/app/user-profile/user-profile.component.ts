import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username: string;
  data;

  loader = false;
  local: any;
  error = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  search() {
    this.loader = true;
    this.local = localStorage.getItem(this.username);
    if (this.local) {
      this.data = JSON.parse(this.local);
      this.loader = false;
      this.error = false;

    } else {
      this.http.get('https://api.github.com/users/' + this.username).subscribe(Response => {
        this.data = Response;

        this.loader = false;
        this.error = false;
        localStorage.setItem(this.username, JSON.stringify(this.data));
      }, err => {

        this.data = false;
        this.loader = false;
        this.error = true;
        this.snackBar.open('Bad Credential', 'Close', { duration: 6000, verticalPosition: 'top', horizontalPosition: 'right' });
      }
      );
    }
  }
}
