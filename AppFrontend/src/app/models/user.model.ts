export class User {
    _id: string;
    username: string;

    // PASSWORD SHOULDN'T BE STORED IN THE MODEL (only for use on the signup page)
    password?: string;
}