import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mode: string;

  public MODE_CLIENT = "client";
  public MODE_EMPLOYEE = "employee";

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.mode = this.configService.getProperty('mode');
  }
}
