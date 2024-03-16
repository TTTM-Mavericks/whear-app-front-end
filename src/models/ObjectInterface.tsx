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
    reactPerClothes?: number,
    clothesStyle?: string[];
    reacted?: boolean;
    gender?: boolean;
}

export interface CollectionInterface {
    collectionID?: any;
    userID?: any;
    nameOfCollection?: string;
    typeOfCollection?: string;
    numberOfClothes?: number;
    collectionStatus?: string;
    imgUrl?: string;
    clothesList?: ClothesInterface[];
}


export interface NotificationInterface {
    notiID?: any;
    baseUserID?: string;
    targetUserID?: string;
    messageType?: string;
    content?: string;
    sender?: string;
    action?: string;
    actionID?: any;
    message?: string;
    status?: boolean;
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

export interface PaymentInterface {
    bin?: number,
    accountNumber?: string,
    accountName?: string,
    currency?: string,
    paymentLinkId?: string,
    amount?: number,
    description?: string,
    orderCode?: number,
    status?: string,
    checkoutUrl?: string,
    qrCode?: string
}

export interface OrderDataInterface {
    id: string;
    orderCode: number;
    amount: number;
    amountPaid: number;
    amountRemaining: number;
    status: string;
    createdAt: string;
    transactions: [];
    canceledAt: string | null;
    cancellationReason: string | null;
  }
  
  export interface TransactionInterface {
    code: string;
    desc: string;
    data: OrderDataInterface;
    signature: string;
    checkoutUrl: string;
    qrCode: string;
  }

