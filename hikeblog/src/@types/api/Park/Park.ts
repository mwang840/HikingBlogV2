export interface Activity {
    id: string;
    name: string;
}

export interface Topic {
    id: string;
    name: string;
}

export interface Contacts {
    phoneNumbers: PhoneNumber[];
    emailAddresses: EmailAddress[];
}

export interface PhoneNumber {
    phoneNumber: string;
    description: string;
    extension: string;
    type: string;
}

export interface EmailAddress {
    description: string;
    emailAddress: string;
}

export interface EntranceFee {
    cost: string;
    description: string;
    title: string;
}

export interface EntrancePass {
    cost: string;
    description: string;
    title: string;
}

export interface OperatingHour {
    exceptions: any[];
    description: string;
    standardHours: StandardHours;
    name: string;
}

export interface StandardHours {
    wednesday: string;
    monday: string;
    thursday: string;
    sunday: string;
    tuesday: string;
    friday: string;
    saturday: string;
}

export interface Address {
    postalCode: string;
    city: string;
    stateCode: string;
    countryCode: string;
    provinceTerritoryCode: string;
    line1: string;
    type: string;
    line3: string;
    line2: string;
}

export interface Image {
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
}

export interface Park {
    id: string;
    url: string;
    fullName: string;
    parkCode: string;
    description: string;
    latitude: string;
    longitude: string;
    latLong: string;
    activities: Activity[];
    topics: Topic[];
    states: string;
    contacts: Contacts;
    entranceFees: EntranceFee[];
    entrancePasses: EntrancePass[];
    fees: any[];
    directionsInfo: string;
    directionsUrl: string;
    operatingHours: OperatingHour[];
    addresses: Address[];
    images: Image[];
    weatherInfo: string;
    name: string;
    designation: string;
    multimedia: any[];
    relevanceScore: number;
}
