import { AuthService } from './core/auth.service';

import { Component,trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //  animations: [
  //   trigger(
  //     'enterAnimation', [
  //       transition(':enter', [
  //         style({transform: 'translateX(100%)', opacity: 0}),
  //         animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
  //       ]),
  //       transition(':leave', [
  //         style({transform: 'translateX(0)', opacity: 1}),
  //         animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
  //       ])
  //     ]
  //   )
  // ]
  animations: [
  trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(500, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(500, style({opacity:0})) 
    ])
  ])
]
})
export class AppComponent {
  title = 'App.html Page';
constructor(private authservice:AuthService) {

}


public showNav:any = false;


}
