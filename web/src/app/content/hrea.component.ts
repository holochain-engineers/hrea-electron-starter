import { Component, ChangeDetectionStrategy } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AgentService, myAgent } from '../services/observation/agent.service'
import { ActionService, Action } from '../services/plan/action.service';

@Component({
  selector: 'hrea',
  templateUrl: './hrea.component.html',
  styleUrls: ['./hrea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HreaComponent {
  title = 'ng-hrea-client';
  user$?:Observable<myAgent>
  actions$?:Observable<Action[]> 

  constructor(private agentService: AgentService, private actionService: ActionService){
  }

  ngOnInit() {
      this.user$ = this.agentService.getMyAgent().valueChanges.pipe(map(result => {
       //console.log("here:",result.data)
        return result.data.myAgent
      }))

  }

  listAllActions(){
    this.actions$ = this.actionService.ListAllActions().valueChanges.pipe(map(result => {
     // console.log("actions",result)
      return result.data.actions
    }))
  }

}

