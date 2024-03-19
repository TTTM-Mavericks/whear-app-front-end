import { ImageSourcePropType } from "react-native";

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Email Validator
 * @param email 
 * @returns 
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the password is provided
  if (!email) {
    return {
      isValid: false,
      error: 'Email is required.',
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Invalid email format.',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Email Validator
 * @param email 
 * @returns 
 */
export const validateUsername = (username: string): ValidationResult => {
  const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username) {
    return {
      isValid: false,
      error: 'Username is required.',
    };
  }

  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      error: 'Username must be only charaties.',
    };
  }

  return {
    isValid: true,
  };
}

export const validateString = (string: string): ValidationResult => {
  const stringRegex = /^[a-zA-Z0-9\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0\u1EA0-\u1EF9\s!@#$%^&*()-_=+{}[]|;:'",.<>?`~]*$/;

  if (!string) {
    return {
      isValid: false,
      error: 'Username is required.',
    };
  }

  if (!stringRegex.test(string)) {
    return {
      isValid: false,
      error: 'String must 8-20 characties and not have special characties.',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Password validator
 * @param password 
 * @returns 
 */
export const validatePassword = (password: string): ValidationResult => {
  // Check if the password is provided
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required.',
    };
  }

  // Define individual conditions for password validation
  const isLengthValid = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

  // Check each condition and return corresponding error messages
  if (!isLengthValid) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters long.',
    };
  }

  if (!hasLowercase) {
    return {
      isValid: false,
      error: 'Password must include at least one lowercase letter.',
    };
  }

  if (!hasUppercase) {
    return {
      isValid: false,
      error: 'Password must include at least one uppercase letter.',
    };
  }

  if (!hasDigit) {
    return {
      isValid: false,
      error: 'Password must include at least one digit.',
    };
  }

  if (!hasSpecialChar) {
    return {
      isValid: false,
      error: 'Password must include at least one special character.',
    };
  }

  // Password is valid
  return {
    isValid: true,
  };
};

export function convertDateFormat(inputDate: any) {
  const birthday = new Date(inputDate);
  const year = birthday.getFullYear();
  const month = (birthday.getMonth() + 1).toString().padStart(2, '0');
  const day = birthday.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(inputDateString: string): string {
  try {
    if (!inputDateString) {
      throw new Error('Input date string is empty or undefined');
    }

    const dateObj = new Date(inputDateString);

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date string');
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, '0'); // Add leading zero if needed

    return `${year}-${month}-${day}`;
  } catch (error: any) {
    console.error(error.message);
    throw error; // Re-throw the error for further handling
  }
}

export function parseDateString(inputDateString: any): Date {
  // Split the input string into year, month, and day components
  const [year, month, day] = inputDateString.split('-').map(Number);

  // Create a Date object with the components
  return new Date(year, month - 1, day); // Note: Months are zero-based in JavaScript Dates
}


type ClothingType =
  | 'SHIRT'
  | 'PANTS'
  | 'DRESS'
  | 'SKIRT'
  | 'JACKET'
  | 'COAT'
  | 'SHORTS'
  | 'SWEATER'
  | 'HOODIE'
  | 'T_SHIRT'
  | 'BLAZER'
  | 'JEANS'
  | 'TANK_TOP'
  | 'SUIT'
  | 'POLO_SHIRT'
  | 'FORMAL_WEAR'
  | 'ATHLETIC_WEAR'
  | 'BOMBER'
  | 'CROPTOP'
  | 'BLOUSE'
  | 'BABY_TEE'
  | 'FLARED_PANTS'
  | 'OVERSIZE_TEE'
  | 'SPORTS_BRA'
  | 'JACKET_ZIP'
  | 'BRETON_STRIPED'
  | 'TRENCH_COAT'
  | 'VELVET_BLAZER'
  | 'LONG_SLEEVE'
  | 'OXFORD_SHIRT'
  | 'GILE'
  | 'HOODED_CARDIGAN'
  | 'CARDIGAN'
  | 'FLOWY_BOHO_DRESS'
  | 'TIE_DYE_SHIRTS'
  | 'LONG_MAXI_DRESS'
  | 'FLOWY'
  | 'LATE_SHOULDER_SHIRT'
  | 'HOUSE_DRESS'
  | 'ZIP_HOODIE'
  | 'LONG_SLEEVE_MEST_TOP'
  | 'BAGGY'
  | 'PANT_SUIT'
  | 'WIDE_LEG_PANT'
  | 'CARGO_PANT'
  | 'SKINNY'
  | 'JOGGER'
  | 'PENCIL_SKIRT'
  | 'BLACK_CARGO_PANT'
  | 'SNEAKER'
  | 'DERBY'
  | 'CHELSEA_BOOTS'
  | 'LOAFERS'
  | 'PUMPS'
  | 'THIGH_HIGH_BOOTS'
  | 'KNEE_HIGH_BOOTS'
  | 'WELLINGTON_BOOTS'
  | 'DR_MARTENS'
  | 'OXFORD'
  | 'BOOTS'
  | 'SANDALS'
  | 'RUNNING_SHOES'
  | 'HIGH_TOP_SNEAKER'
  | 'BALLERINA_FLATS'
  | 'HEEL'
  | 'SLIP_ON'
  | 'PLATFORM_WEDGES'
  | 'BRACELET'
  | 'TIE'
  | 'NECKLACE'
  | 'EARRINGS'
  | 'SUNGLASSES'
  | 'HANDBAG'
  | 'WATCH'
  | 'CAP'
  | 'BEANIE'
  | 'SNAPBACK'
  | 'GLOVES'
  | 'SCARF'
  | 'BERET'
  | 'SHOULDER_BAG'
  | 'BELT'
  | 'WOVEN_BELT'
  | 'COIN_BELT'
  | 'STACKABLE_BRACELETS'
  | 'BOHO_HEADBAND'
  | 'BEADED_JEWELRY'
  | 'BERET_HAT';

export const getIconClothImage = (type: string): ImageSourcePropType => {
  switch (type) {
    case 'SHIRT':
      return require('../../../assets/icon/shirt.png');
    case 'T_SHIRT':
      return require('../../../assets/icon/shirt.png');
    case 'PANTS':
      return require('../../../assets/icon/pants.png');
    case 'DRESS':
      return require('../../../assets/icon/dress.png');
    case 'SKIRT':
      return require('../../../assets/icon/skirt.png');
    case 'JACKET':
      return require('../../../assets/icon/jacket.png');
    case 'COAT':
      return require('../../../assets/icon/coat.png');
    case 'SHORTS':
      return require('../../../assets/icon/shorts.png');
    case 'SWEATER':
      return require('../../../assets/icon/sweater.png');
    case 'HOODIE':
      return require('../../../assets/icon/hoodie.png');
    case 'BLAZER':
      return require('../../../assets/icon/blazer.png');
    case 'JEANS':
      return require('../../../assets/icon/pants.png');
    case 'TANK_TOP':
      return require('../../../assets/icon/tank_top.png');
    case 'SUIT':
      return require('../../../assets/icon/suit.png');
    case 'POLO_SHIRT':
      return require('../../../assets/icon/polo_shirt.png');
    case 'FORMAL_WEAR':
      return require('../../../assets/icon/formal_wear.png');
    case 'ATHLETIC_WEAR':
      return require('../../../assets/icon/athletic_wear.png');
    case 'BOMBER':
      return require('../../../assets/icon/bomber.png');
    case 'CROPTOP':
      return require('../../../assets/icon/tank_top.png');
    case 'BLOUSE':
      return require('../../../assets/icon/blouse.png');
    case 'BABY_TEE':
      return require('../../../assets/icon/baby_tee.png');
    case 'FLARED_PANTS':
      return require('../../../assets/icon/flared_pants.png');
    case 'OVERSIZE_TEE':
      return require('../../../assets/icon/oversize_tee.png');
    case 'SPORTS_BRA':
      return require('../../../assets/icon/sports_bra.png');
    case 'JACKET_ZIP':
      return require('../../../assets/icon/jacket.png');
    case 'BRETON_STRIPED':
      return require('../../../assets/icon/shirt.png');
    case 'TRENCH_COAT':
      return require('../../../assets/icon/trench_coat.png');
    case 'VELVET_BLAZER':
      return require('../../../assets/icon/suit.png');
    case 'LONG_SLEEVE':
      return require('../../../assets/icon/sweater.png');
    case 'OXFORD_SHIRT':
      return require('../../../assets/icon/shirt.png');
    case 'GILE':
      return require('../../../assets/icon/suit.png');
    case 'HOODED_CARDIGAN':
      return require('../../../assets/icon/jacket.png');
    case 'CARDIGAN':
      return require('../../../assets/icon/cardigan.png');
    case 'FLOWY_BOHO_DRESS':
      return require('../../../assets/icon/dress.png');
    case 'TIE_DYE_SHIRTS':
      return require('../../../assets/icon/shirt.png');
    case 'LONG_MAXI_DRESS':
      return require('../../../assets/icon/dress.png');
    case 'FLOWY':
      return require('../../../assets/icon/dress.png');
    case 'LATE_SHOULDER_SHIRT':
      return require('../../../assets/icon/shirt.png');
    case 'HOUSE_DRESS':
      return require('../../../assets/icon/dress.png');
    case 'ZIP_HOODIE':
      return require('../../../assets/icon/hoodie.png');
    case 'LONG_SLEEVE_MEST_TOP':
      return require('../../../assets/icon/suit.png');
    case 'BAGGY':
      return require('../../../assets/icon/jeans.png');
    case 'PANT_SUIT':
      return require('../../../assets/icon/pants.png');
    case 'WIDE_LEG_PANT':
      return require('../../../assets/icon/pants.png');
    case 'CARGO_PANT':
      return require('../../../assets/icon/pants.png');
    case 'SKINNY':
      return require('../../../assets/icon/jeans.png');
    case 'JOGGER':
      return require('../../../assets/icon/jogger.png');
    case 'PENCIL_SKIRT':
      return require('../../../assets/icon/skirt.png');
    case 'BLACK_CARGO_PANT':
      return require('../../../assets/icon/pants.png');
    case 'BRACELET':
      return require('../../../assets/icon/bracelet.png');
    case 'TIE':
      return require('../../../assets/icon/tie.png');
    case 'NECKLACE':
      return require('../../../assets/icon/necklace.png');
    case 'EARRINGS':
      return require('../../../assets/icon/earrings.png');
    case 'SUNGLASSES':
      return require('../../../assets/icon/sunglasses.png');
    case 'HANDBAG':
      return require('../../../assets/icon/handbag.png');
    case 'WATCH':
      return require('../../../assets/icon/watch.png');
    case 'CAP':
      return require('../../../assets/icon/cap.png');
    case 'BEANIE':
      return require('../../../assets/icon/beanie.png');
    case 'SNAPBACK':
      return require('../../../assets/icon/cap.png');
    case 'GLOVES':
      return require('../../../assets/icon/gloves.png');
    case 'SCARF':
      return require('../../../assets/icon/scarf.png');
    case 'BERET':
      return require('../../../assets/icon/beret.png');
    case 'SHOULDER_BAG':
      return require('../../../assets/icon/shoulder_bag.png');
    case 'BELT':
      return require('../../../assets/icon/belt.png');
    case 'WOVEN_BELT':
      return require('../../../assets/icon/belt.png');
    case 'COIN_BELT':
      return require('../../../assets/icon/belt.png');
    case 'STACKABLE_BRACELETS':
      return require('../../../assets/icon/necklace.png');
    case 'BOHO_HEADBAND':
      return require('../../../assets/icon/necklace.png');
    case 'BEADED_JEWELRY':
      return require('../../../assets/icon/necklace.png');
    case 'BERET_HAT':
      return require('../../../assets/icon/cap.png');
    case 'BOOTS':
      return require('../../../assets/icon/sneakers.png');
    case 'SNEAKER':
      return require('../../../assets/icon/sneakers.png');
    case 'LOAFERS':
      return require('../../../assets/icon/sneakers.png');
    case 'OXFORD':
      return require('../../../assets/icon/sneakers.png');
    default:
      throw new Error(`Unsupported clothing type: ${type}`);
  }
};