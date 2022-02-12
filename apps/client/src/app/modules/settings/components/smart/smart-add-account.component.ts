import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { SocialPlatform } from '../../../../shared/models/social-platform.model';
import { SocialAccountsService } from '../../../../shared/services/social-accounts.service';

@Component({
    selector: 'app-smart-add-account',
    template: ``
})
export class SmartAddAccountComponent implements OnInit {
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private socialAccountsService: SocialAccountsService) {}

    ngOnInit(): void {
        combineLatest([this.activatedRoute.params, this.activatedRoute.queryParams]).subscribe(async ([params, queryParams]) => {
            switch (params.platform) {
                case SocialPlatform.INSTAGRAM:
                    await this.socialAccountsService.saveAccount(
                        queryParams.code,
                        params.platform,
                      document.location.href.split('/settings')[0] + '/settings/add-account/instagram/'
                    );
                    return;
                default:
                    return;
            }
        });
    }
}
