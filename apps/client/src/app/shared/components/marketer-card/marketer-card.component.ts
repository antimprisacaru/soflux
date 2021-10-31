import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import Marketer from '../../models/marketer.model';
import { SocialPlatform } from '../../models/social-platform.model';

@Component({
    selector: 'app-marketer-card',
    templateUrl: './marketer-card.component.html',
    styleUrls: ['./marketer-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketerCardComponent {
    @Input() marketer: Marketer;

    platform = () => {
        switch (this.marketer.platform) {
            case SocialPlatform.INSTAGRAM:
                return 'Instagram';
            case SocialPlatform.FACEBOOK:
                return 'Facebook';
            case SocialPlatform.TWITCH:
                return 'Twitch';
            case SocialPlatform.YOUTUBE:
                return 'YouTube';
        }
    };
}
