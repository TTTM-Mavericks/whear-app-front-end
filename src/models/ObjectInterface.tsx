export interface UserInterFace {
    userID?: number;
    username?: string;
    password?: string;
    dateOfBirth?: Date;
    phone?: string;
    email?: string;
    gender?: string;
    role?: string;
    imgUrl?: string;
    status?: string;
    language?: string;
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
  


