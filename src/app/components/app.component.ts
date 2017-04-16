import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../styles/app.component.css']
})
export class AppComponent {
  title: string = 'Angular2';
 
  name: string = 'Newton';

  changeName():void{
    this.name == 'Newton' 
      ? this.name = 'Aristophanes' 
      : this.name = 'Newton'
  }

}
