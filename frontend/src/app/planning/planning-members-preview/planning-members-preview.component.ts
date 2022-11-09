import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-planning-members-preview',
  templateUrl: './planning-members-preview.component.html',
  styleUrls: ['./planning-members-preview.component.scss'],
})
export class PlanningMembersPreviewComponent implements OnInit {
  constructor() {}

  @Input() csv: any[] | undefined;
  arrangedCsv: { tuteur: {}[]; map: {}[]; etudiant: {}[] } | undefined =
    undefined;

  ngOnInit(): void {
    this.arrangedCsv = this.arrangeCsv(this.csv);
    console.log(this.arrangedCsv);
  }

  arrangeCsv(csv: any[] | undefined): {
    tuteur: {}[];
    map: {}[];
    etudiant: {}[];
  } {
    let arrangedCsv = {
      tuteur: [],
      etudiant: [],
      map: [],
    };
    csv?.forEach((entry) => {
      // @ts-ignore
      arrangedCsv[entry.role].push({
        name: entry?.nom,
        prenom: entry?.prenom,
        email: entry?.email,
        specialiteInfo: entry?.specialiteInfo,
        noEtudiant: entry?.noEtudiant,
      });
    });

    return arrangedCsv;
  }
}
