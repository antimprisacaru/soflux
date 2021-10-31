import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import User from '../../../shared/models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    activeRoute: string;
    @Input() user: User;
    @Output() logout = new EventEmitter<void>();

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.activeRoute = this.router.url.split('/')[1];
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.activeRoute = event.url.split('/')[1];
            }
        });
    }
}
