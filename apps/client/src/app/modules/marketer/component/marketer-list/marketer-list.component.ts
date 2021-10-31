import { Component, ChangeDetectionStrategy } from '@angular/core';
import Marketer from '../../../../shared/models/marketer.model';
import { SocialPlatform } from '../../../../shared/models/social-platform.model';

@Component({
    selector: 'app-marketer-list',
    templateUrl: './marketer-list.component.html',
    styleUrls: ['./marketer-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketerListComponent {
    marketers: Marketer[] = [
        {
            id: 1,
            firstName: 'Candie',
            lastName: 'Foottit',
            email: 'cfoottit0@hostgator.com',
            posts: 297,
            followers: 549830,
            picture: 'https://robohash.org/eligendiautemeum.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Vivamus vel nulla eget eros elementum pellentesque.'
        },
        {
            id: 2,
            firstName: 'Marissa',
            lastName: 'Baddow',
            email: 'mbaddow1@live.com',
            posts: 268,
            followers: 306108,
            picture: 'https://robohash.org/doloresearumsed.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description:
                'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
        },
        {
            id: 3,
            firstName: 'Devin',
            lastName: 'Climer',
            email: 'dclimer2@nytimes.com',
            posts: 168,
            followers: 68366,
            picture: 'https://robohash.org/suntadnatus.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description:
                'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.'
        },
        {
            id: 4,
            firstName: 'Maurizia',
            lastName: 'Harrad',
            email: 'mharrad3@lycos.com',
            posts: 80,
            followers: 255200,
            picture: 'https://robohash.org/veroquaequia.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.'
        },
        {
            id: 5,
            firstName: 'Aliza',
            lastName: 'Whelan',
            email: 'awhelan4@indiegogo.com',
            posts: 146,
            followers: 569546,
            picture: 'https://robohash.org/etautemrerum.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Aliquam quis turpis eget elit sodales scelerisque.'
        },
        {
            id: 6,
            firstName: 'Percival',
            lastName: 'Durdy',
            email: 'pdurdy5@hhs.gov',
            posts: 30,
            followers: 425289,
            picture: 'https://robohash.org/sedenimquam.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.'
        },
        {
            id: 7,
            firstName: 'Charlie',
            lastName: 'Sutch',
            email: 'csutch6@dropbox.com',
            posts: 150,
            followers: 830278,
            picture: 'https://robohash.org/omnisutfugit.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Suspendisse accumsan tortor quis turpis.'
        },
        {
            id: 8,
            firstName: 'Yolane',
            lastName: 'Statter',
            email: 'ystatter7@nasa.gov',
            posts: 425,
            followers: 441561,
            picture: 'https://robohash.org/ametillumdolores.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'In est risus, auctor sed, tristique in, tempus sit amet, sem.'
        },
        {
            id: 9,
            firstName: 'Carlie',
            lastName: 'Toffano',
            email: 'ctoffano8@cloudflare.com',
            posts: 65,
            followers: 498496,
            picture: 'https://robohash.org/etnullamolestias.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description:
                'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.'
        },
        {
            id: 10,
            firstName: 'Kirstyn',
            lastName: 'Minichillo',
            email: 'kminichillo9@merriam-webster.com',
            posts: 90,
            followers: 457970,
            picture: 'https://robohash.org/sapienteetet.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description:
                'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.'
        },
        {
            id: 11,
            firstName: 'Theodosia',
            lastName: 'Roxbee',
            email: 'troxbeea@studiopress.com',
            posts: 83,
            followers: 683251,
            picture: 'https://robohash.org/etdoloremesse.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.'
        },
        {
            id: 12,
            firstName: 'Jakie',
            lastName: 'Nashe',
            email: 'jnasheb@constantcontact.com',
            posts: 6,
            followers: 788887,
            picture: 'https://robohash.org/necessitatibusautcorporis.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.'
        },
        {
            id: 13,
            firstName: 'Andriette',
            lastName: 'Leele',
            email: 'aleelec@linkedin.com',
            posts: 364,
            followers: 820359,
            picture: 'https://robohash.org/quivoluptatesnobis.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Aenean lectus. Pellentesque eget nunc.'
        },
        {
            id: 14,
            firstName: 'Pancho',
            lastName: 'Singh',
            email: 'psinghd@people.com.cn',
            posts: 118,
            followers: 718333,
            picture: 'https://robohash.org/ipsamofficiisillum.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description:
                'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.'
        },
        {
            id: 15,
            firstName: 'Koo',
            lastName: 'Wickersham',
            email: 'kwickershame@clickbank.net',
            posts: 130,
            followers: 668706,
            picture: 'https://robohash.org/velitetexcepturi.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Nulla tellus.'
        },
        {
            id: 16,
            firstName: 'Benn',
            lastName: 'Dovey',
            email: 'bdoveyf@goo.gl',
            posts: 9,
            followers: 154283,
            picture: 'https://robohash.org/voluptatemetsoluta.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.'
        },
        {
            id: 17,
            firstName: 'Linette',
            lastName: 'Juorio',
            email: 'ljuoriog@etsy.com',
            posts: 264,
            followers: 13319,
            picture: 'https://robohash.org/quinontenetur.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description:
                'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.'
        },
        {
            id: 18,
            firstName: 'Luther',
            lastName: 'Tenaunt',
            email: 'ltenaunth@un.org',
            posts: 200,
            followers: 260883,
            picture: 'https://robohash.org/molestiaemolestiasquo.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description: 'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.'
        },
        {
            id: 19,
            firstName: 'Kelly',
            lastName: 'McCarty',
            email: 'kmccartyi@addthis.com',
            posts: 199,
            followers: 629420,
            picture: 'https://robohash.org/indelectusquia.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description:
                'Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.'
        },
        {
            id: 20,
            firstName: 'Ashely',
            lastName: 'Wackett',
            email: 'awackettj@goodreads.com',
            posts: 18,
            followers: 719781,
            picture: 'https://robohash.org/etnonvoluptatum.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description:
                'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.'
        },
        {
            id: 21,
            firstName: 'Scottie',
            lastName: 'Shankle',
            email: 'sshanklek@jiathis.com',
            posts: 150,
            followers: 779635,
            picture: 'https://robohash.org/eanumquamsed.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.'
        },
        {
            id: 22,
            firstName: 'Lanny',
            lastName: 'Jancik',
            email: 'ljancikl@hhs.gov',
            posts: 285,
            followers: 437418,
            picture: 'https://robohash.org/doloreoccaecatidolores.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.'
        },
        {
            id: 23,
            firstName: 'Verena',
            lastName: 'Aymer',
            email: 'vaymerm@deviantart.com',
            posts: 298,
            followers: 942631,
            picture: 'https://robohash.org/fugasedomnis.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.'
        },
        {
            id: 24,
            firstName: 'Luce',
            lastName: 'McCreery',
            email: 'lmccreeryn@hc360.com',
            posts: 153,
            followers: 599151,
            picture: 'https://robohash.org/ametautemrecusandae.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description:
                'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.'
        },
        {
            id: 25,
            firstName: 'Pietra',
            lastName: 'Helwig',
            email: 'phelwigo@e-recht24.de',
            posts: 125,
            followers: 766144,
            picture: 'https://robohash.org/voluptatemconsequaturat.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description:
                'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.'
        },
        {
            id: 26,
            firstName: 'Sissie',
            lastName: 'Ellerton',
            email: 'sellertonp@mapy.cz',
            posts: 194,
            followers: 281886,
            picture: 'https://robohash.org/quisintducimus.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description:
                'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.'
        },
        {
            id: 27,
            firstName: 'Greggory',
            lastName: 'Risebarer',
            email: 'grisebarerq@hugedomains.com',
            posts: 209,
            followers: 748605,
            picture: 'https://robohash.org/quorepellatipsam.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Curabitur in libero ut massa volutpat convallis.'
        },
        {
            id: 28,
            firstName: 'Early',
            lastName: 'Stonebanks',
            email: 'estonebanksr@discuz.net',
            posts: 217,
            followers: 409377,
            picture: 'https://robohash.org/perspiciatisodioin.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description:
                'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.'
        },
        {
            id: 29,
            firstName: 'Grier',
            lastName: 'Bugs',
            email: 'gbugss@reddit.com',
            posts: 28,
            followers: 50962,
            picture: 'https://robohash.org/quiafacerenumquam.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
        },
        {
            id: 30,
            firstName: 'Imojean',
            lastName: 'Jouaneton',
            email: 'ijouanetont@purevolume.com',
            posts: 215,
            followers: 993527,
            picture: 'https://robohash.org/estquiavel.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'In est risus, auctor sed, tristique in, tempus sit amet, sem.'
        },
        {
            id: 31,
            firstName: 'Ambrosius',
            lastName: "O'Clery",
            email: 'aocleryu@ask.com',
            posts: 397,
            followers: 978212,
            picture: 'https://robohash.org/sitcupiditateet.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'In hac habitasse platea dictumst.'
        },
        {
            id: 32,
            firstName: 'Billy',
            lastName: 'Stewart',
            email: 'bstewartv@twitpic.com',
            posts: 247,
            followers: 205359,
            picture: 'https://robohash.org/voluptateassumendaaut.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.'
        },
        {
            id: 33,
            firstName: 'Morgan',
            lastName: 'Greguol',
            email: 'mgreguolw@elegantthemes.com',
            posts: 185,
            followers: 214483,
            picture: 'https://robohash.org/consecteturatrepellat.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description:
                'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.'
        },
        {
            id: 34,
            firstName: 'Basile',
            lastName: 'Alben',
            email: 'balbenx@sciencedirect.com',
            posts: 7,
            followers: 751395,
            picture: 'https://robohash.org/distinctiocorruptiamet.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Integer a nibh.'
        },
        {
            id: 35,
            firstName: 'Bobbee',
            lastName: 'MacGinney',
            email: 'bmacginneyy@dailymotion.com',
            posts: 51,
            followers: 977235,
            picture: 'https://robohash.org/ipsamautoptio.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description:
                'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.'
        },
        {
            id: 36,
            firstName: 'Cindy',
            lastName: 'Orrett',
            email: 'correttz@shop-pro.jp',
            posts: 217,
            followers: 378004,
            picture: 'https://robohash.org/doloremcommodiipsum.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description: 'Integer a nibh.'
        },
        {
            id: 37,
            firstName: 'Wally',
            lastName: 'Bouts',
            email: 'wbouts10@google.ru',
            posts: 423,
            followers: 952079,
            picture: 'https://robohash.org/voluptasharumtemporibus.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'Morbi non lectus.'
        },
        {
            id: 38,
            firstName: 'Jennica',
            lastName: 'Hildrew',
            email: 'jhildrew11@unicef.org',
            posts: 195,
            followers: 321001,
            picture: 'https://robohash.org/eosmolestiasqui.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description:
                'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.'
        },
        {
            id: 39,
            firstName: 'Tawnya',
            lastName: 'Headrick',
            email: 'theadrick12@ca.gov',
            posts: 117,
            followers: 215684,
            picture: 'https://robohash.org/temporeharumsuscipit.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'Curabitur convallis.'
        },
        {
            id: 40,
            firstName: 'Kore',
            lastName: 'Jephcott',
            email: 'kjephcott13@is.gd',
            posts: 108,
            followers: 125467,
            picture: 'https://robohash.org/nonsequiharum.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.'
        },
        {
            id: 41,
            firstName: 'Emilee',
            lastName: 'Looney',
            email: 'elooney14@woothemes.com',
            posts: 148,
            followers: 711833,
            picture: 'https://robohash.org/aestrepellat.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Curabitur gravida nisi at nibh.'
        },
        {
            id: 42,
            firstName: 'Rollins',
            lastName: 'Haukey',
            email: 'rhaukey15@dailymotion.com',
            posts: 367,
            followers: 513928,
            picture: 'https://robohash.org/cumetmolestias.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description:
                'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.'
        },
        {
            id: 43,
            firstName: 'Marnie',
            lastName: 'Perton',
            email: 'mperton16@tinyurl.com',
            posts: 222,
            followers: 496269,
            picture: 'https://robohash.org/suntmaioresaut.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Nullam porttitor lacus at turpis.'
        },
        {
            id: 44,
            firstName: 'Kiel',
            lastName: 'Iorio',
            email: 'kiorio17@virginia.edu',
            posts: 54,
            followers: 366528,
            picture: 'https://robohash.org/expeditamodidolor.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.'
        },
        {
            id: 45,
            firstName: 'Enos',
            lastName: 'Muzzini',
            email: 'emuzzini18@npr.org',
            posts: 184,
            followers: 466871,
            picture: 'https://robohash.org/corruptiodiosed.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.'
        },
        {
            id: 46,
            firstName: 'Chrissy',
            lastName: 'Jozwik',
            email: 'cjozwik19@merriam-webster.com',
            posts: 367,
            followers: 907316,
            picture: 'https://robohash.org/molestiasseddistinctio.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.'
        },
        {
            id: 47,
            firstName: 'Frasier',
            lastName: 'Merrisson',
            email: 'fmerrisson1a@gizmodo.com',
            posts: 75,
            followers: 680443,
            picture: 'https://robohash.org/voluptatemestmaiores.png?size=320x320&set=set1',
            platform: SocialPlatform.FACEBOOK,
            description: 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.'
        },
        {
            id: 48,
            firstName: 'Meyer',
            lastName: 'Drydale',
            email: 'mdrydale1b@php.net',
            posts: 368,
            followers: 399994,
            picture: 'https://robohash.org/laboriosamplaceatquia.png?size=320x320&set=set1',
            platform: SocialPlatform.YOUTUBE,
            description: 'Pellentesque at nulla. Suspendisse potenti.'
        },
        {
            id: 49,
            firstName: 'Meridel',
            lastName: 'Brabbs',
            email: 'mbrabbs1c@telegraph.co.uk',
            posts: 388,
            followers: 353937,
            picture: 'https://robohash.org/animiporroomnis.png?size=320x320&set=set1',
            platform: SocialPlatform.INSTAGRAM,
            description: 'Vestibulum sed magna at nunc commodo placerat.'
        },
        {
            id: 50,
            firstName: 'Mignonne',
            lastName: 'Ricardo',
            email: 'mricardo1d@cbc.ca',
            posts: 290,
            followers: 319337,
            picture: 'https://robohash.org/etodioet.png?size=320x320&set=set1',
            platform: SocialPlatform.TWITCH,
            description: 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.'
        }
    ];
}
