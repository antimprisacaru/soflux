import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';
import axios from 'axios';
import { InstagramSecret } from '../models/instagram-secret.model';

@Injectable()
export class InstagramHelperService {
    constructor(private readonly httpService: HttpService) {}

    exchangeInstagramCode(code: string, secret: InstagramSecret, redirect: string): Promise<{ accessToken: string; userId: string }> {
        const data = new FormData();
        data.append('client_id', secret.clientId);
        data.append('client_secret', secret.clientSecret);
        data.append('grant_type', 'authorization_code');
        data.append('redirect_uri', redirect);
        data.append('code', code);

        return axios({
            method: 'post',
            url: 'https://api.instagram.com/oauth/access_token',
            headers: {
                ...data.getHeaders()
            },
            data
        })
            .then(result => {
                if (result.status != 200) {
                    throw new Error(result.data?.error_message || result.statusText);
                }
                return {
                    accessToken: result.data.accessToken,
                    userId: result.data.user_id
                };
            })
            .catch(e => {
                throw new Error(e.response.data?.error_message || e);
            });
    }

    fetchInstagramUser(accessToken: string): Promise<any> {
        return firstValueFrom<any>(
            this.httpService
                .post(`https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${accessToken}`, {
                    method: 'GET'
                })
                .pipe(
                    map(result => {
                        if (result.status != 200) {
                            throw new Error(result.data?.error_message || result.statusText);
                        }
                        console.log(result.data);
                        return result.data;
                    }),
                    catchError(e => {
                        console.log(e);
                        throw new Error(e.response.data || e);
                    })
                )
        );
    }
}
