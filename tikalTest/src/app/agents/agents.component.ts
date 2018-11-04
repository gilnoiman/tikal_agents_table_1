import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  agents$: any;

  constructor(private data: DataService) { }

  isolatedAgentList: any = {};
  countrysList: any = {};
  isolatedCountry: String = '';
  missionLength: Number = 0;

  // A Function that returns a list of all isolated agents.
  getIsolatedAgentList = function() {
    const isolatedAgentList: any = {};
    for (let i = 0 ; i < this.agents$.length ; i++) {
      const currentTempAgent: any = this.agents$[i].agent;
      if ( isolatedAgentList[currentTempAgent]) {
          delete isolatedAgentList[this.agents$[i].agent];
      } else {
      isolatedAgentList[currentTempAgent] = this.agents$[i].country;
      }
    }
    return isolatedAgentList; 
  };

  // A Function that gets the isolated agents list and returns the most isolated country.
  isolatedCountriesCounter = function(AgentList) {
    const countriesList = {};
    const topCountry: any = {'country': '', 'rate': '0'};
    for ( const agent in AgentList ) {
      if ( agent ) {
        const currentAgent = AgentList[agent];
        if ( countriesList[currentAgent]) {
          countriesList[currentAgent] ++;
        } else {
          countriesList[currentAgent] = 1;
        }
      }
    }

    for (const country in countriesList) {
      if ( country ) {
        if (topCountry['rate'] && topCountry['rate'] < countriesList[country]) {
        topCountry['name'] = country;
        topCountry['rate'] = countriesList[country];
        }
      }
    }
    return topCountry.name;
  };

  // ON Init function:
  ngOnInit() {
    this.data.getAgents().subscribe(
      data => {
         this.agents$ = data; // get the agent lest data from the service
         this.isolatedAgentList = this.getIsolatedAgentList(); // call getIsolatedAgentList method for getting the isolated agent list
         this.isolatedCountry = this.isolatedCountriesCounter(this.isolatedAgentList); // call the method for getting the isolated country.
         this.missionLength = this.agents$.length;
         this.agents$.sort(( a , b ) => new Date(a.date).getTime() - new Date(b.date).getTime()); // sort the agent list by date ascending
        }
    );
  }

}
