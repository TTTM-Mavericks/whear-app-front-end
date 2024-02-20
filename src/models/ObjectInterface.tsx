export interface UserInterFace {
    userID?: number;
    username?: string;
    password?: string;
    dateOfBirth?: string;
    phone?: string;
    email?: string;
    gender?: string;
    role?: string;
    subRole?: string;
    imgUrl?: string;
    status?: string;
    language?: string;
    isFirstLogin?: boolean;
    followed?: boolean;
}

export interface CustomerInterface {
    customerID?: string;
    isFirstLogin?: boolean;
    subRoleID?: string;
}

export interface BrandStoreInterface {
    brandID?: string;
    description?: string;
    address?: string;
    link?: string;
}


export interface ClothesInterface {
    clothesID: string
    userID?: string;
    nameOfProduct?: string;
    typeOfClothes?: string;
    shape?: string;
    clothesSeasons?: string[];
    description?: string;
    link?: string;
    rating?: number;
    materials?: string;
    hashtag?: string[];
    clothesColors?: string[];
    clothesSizes?: string[];
    clothesImages: string[];
    react?: number,
    clothesStyle?: string[];
}

export interface CollectionInterface {
    userID?: string;
    nameOfCollection?: string;
    typeOfCollection?: string;
    numberOfClothes?: number;
    collectionStatus?: string;
    imgUrl?: string;
}


export interface NotificationInterface {
    notiID?: string;
    baseUserID?: string;
    targetUserID?: string;
    messageType?: string;
    content?: string;
    sender?: string;
    action?: string;
    actionID?: number;
    message?: string;
    status?: string;
    dateTime?: string;
}

export interface PostingInterface {
    postID?: number;
    userResponse?: UserInterFace;
    typeOfPosts?: string;
    content?: string;
    hashtag?: string[];
    image?: string[];
    date?: string;
    status?: string;
    comment?: CommentsInterface[];
    react?: ReactInterface[];
    reacted?: boolean;
}


export interface CommentsInterface {
    commentID: any,
    user: UserInterFace,
    postID?: any,
    content: string,
    date?: string
}

export interface ReactInterface {
    userID: any,
    postID: any,
    react: any,
}



