import { UserRole } from '../../../api/user/model/user-role.model';

export const seed = [
    {
        id: '1',
        email: 'antimpris@gmail.com',
        firstName: 'Tim',
        lastName: 'Jones',
        website: 'http://timjones.co.uk',
        about: '',
        country: 'Romania',
        street: 'Str. Narrow',
        city: 'Cluj-Napoca',
        state: 'Cluj',
        zip: '853764',
        role: UserRole.MARKETER
    }
];
