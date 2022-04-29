import {Injectable} from '@angular/core';
import {Apollo, QueryRef, gql} from 'apollo-angular';
//import { Observable } from 'rxjs';

export interface myAgent
{
  __typename:string
  id:string
  name:string
}

export interface myAgentdata
{
  myAgent:myAgent
}

@Injectable({
  providedIn: "root"
})
export class AgentService  {

  constructor(private apollo: Apollo) {
  }

  getMyAgent(): QueryRef<myAgentdata> {
    console.log("apollo data:",this.apollo)
    return this.apollo.watchQuery({
      query: gql`{
        myAgent {
          id
         name
        }
      }`,
    })
  }
}