import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@core/user';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush

}
 )
export class HeaderComponent implements OnInit{

@Input()
user:User;

@Output()
logoutEvent = new EventEmitter<any>();

constructor(){

}

logout(){
  
}
ngOnInit() {

}
}

