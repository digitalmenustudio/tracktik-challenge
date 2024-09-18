
export interface Client {
  id: string;
  givenName: string;
  logo: string;
  tags: string[];
}

export interface Address {
  zipCode: string;
  city: string;
  street: string;
  country: string;
  state: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  address: Address;
}

export interface Site {
  id: string;
  clientId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  contacts: {
    main: Contact;
  };
  address: Address;
  images: string[];
  tags: string[];
}
