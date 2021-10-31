import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-accounts-table',
    templateUrl: './accounts-table.component.html',
    styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent {
    @Output() addInstagram = new EventEmitter<void>();

    constructor(private router: Router) {}

    openInstagramAuthWindow(): void {
        window.location.href = `https://www.instagram.com/oauth/authorize?client_id=393702908615075&redirect_uri=${'https://localhost:4200/settings/add-account/instagram/'}&scope=user_profile,user_media&response_type=code`;
    }
}
