export interface IUser {
    id?: number;
    login?: string;
    password?: string;
    name?: string;
    img?: string;
    age?: number | undefined;
    cityId?: number | undefined;
    universityId?:number | undefined;
    city?: ICity;
    university?: IUniversity;
}

export interface ICity {
    id: number;
    name: string;
}

export interface IUniversity {
    id: number;
    name: string;
}

export interface IPost {
    id?: number;
    text?: string;
    img?: string;
    likes?: ILikes[];
}

export interface ILikes {
    id?: number;
    postId?: number;
    userId?: number;
}

export interface IFriends {
    id: number;
    userId?: number;
    user2Id?: number;
    user?: IUser;
    user2?: IUser;
}

export interface IConfirmFriend {
    id?: number;
    userId?: number;
    user2Id?: number;
    user?: IUser;
    user2?: IUser;
}

export interface IDialogs {
    id: number;
}

export interface IMessages {
    id: number;
    text: string;
}