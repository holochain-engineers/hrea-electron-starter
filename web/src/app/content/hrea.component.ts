import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AgentService, myAgent } from '../services/agent.service'

@Component({
  selector: 'hrea',
  templateUrl: './hrea.component.html',
  styleUrls: ['./hrea.component.scss']
})
export class HreaComponent {
  title = 'ng-hrea-client';
  user$?:Observable<myAgent>

  constructor(private agentService: AgentService){
  }

  ngOnInit() {
     this.user$ = this.agentService.getMyAgent().valueChanges.pipe(map(result => {
     // console.log("here:",result.data)
      return result.data.myAgent
    }))
  }
}



