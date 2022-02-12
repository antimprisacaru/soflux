import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import User from '../../../shared/models/user.model';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-profile-dropdown',
    templateUrl: './profile-dropdown.component.html',
    styleUrls: ['./profile-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDropdownComponent implements AfterViewInit {
    @Input() user: User;
    @Output() logout = new EventEmitter<void>();
    dropdownPopoverShow = false;
    @ViewChild('btnDropdownRef', { static: false })
    btnDropdownRef: ElementRef;
    @ViewChild('popoverDropdownRef', { static: false })
    popoverDropdownRef: ElementRef;

    constructor(private router: Router) {
        router.events.subscribe((e: Event) => {
            if (e instanceof NavigationStart) {
                this.dropdownPopoverShow = false;
            }
        });
    }

    ngAfterViewInit(): void {
        createPopper(this.btnDropdownRef.nativeElement, this.popoverDropdownRef.nativeElement, {
            placement: 'bottom-start'
        });
    }

    toggleDropdown(event): void {
        event.preventDefault();
        this.dropdownPopoverShow = !this.dropdownPopoverShow;
    }
}
