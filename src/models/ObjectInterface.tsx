export interface UserInterFace {
    userID?: number;
    username?: string;
    password?: string;
    dateOfBirth?:  string ;
    phone?: string;
    email?: string;
    gender?: string;
    role?: string;
    subRole?: string;
    imgUrl?: string;
    status?: string;
    language?: string;
    isFirstLogin?: boolean;
    followed?:boolean;
}

interface CustomerInterface {
    customerID?: string;
    isFirstLogin?: boolean;
    subRoleID?: string;
}

interface BrandStoreInterface {
    brandID?: string;
    description?: string;
    address?: string;
    link?: string;
}


interface ClothesInterface {
    clothesID: string
    userID?: string;
    nameOfProduct?: string;
    typeOfClothes?: string;
    shape?: string;
    seasons?: string;
    description?: string;
    link?: string;
    rating?: number;
    materials?: string;
    hashtag?: string[];
    clothesColors?: string[];
    clothesSizes?: string[];
    clothesImages?: string[];
}

interface CollectionInterface {
    userID: string;
    nameOfCollection: string;
    typeOfCollection: string;
    numberOfClothes: number;
    collectionStatus: string;
    imgUrl: string;
  }
  


