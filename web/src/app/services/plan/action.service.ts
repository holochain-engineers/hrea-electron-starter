import {Injectable} from '@angular/core';
import {Apollo, QueryRef, gql} from 'apollo-angular';

export interface Action
{
  id?:string
  inputOutput?:string
  label?:string
  onhandEffect?:string
  pairsWith?:string
  resourceEffect?:string
}

export interface ActionData
{
  actions:[Action]
}

@Injectable({
  providedIn: "root"
})
export class ActionService  {

  constructor(private apollo: Apollo) {
  }

  ListAllActions(): QueryRef<ActionData> {
    console.log("apollo data:",this.apollo)
    return this.apollo.watchQuery({
      query: gql`{
        actions {
          id
        }
      }`,
    })
  }
}