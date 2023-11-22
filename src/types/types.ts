export type SessionData = {
  user: {
    name: string | null;
    image: string;
    email: string;
    id: string;
  };
  expires: string;
};

export type Form = {
  id: number;
  name: string;
  createdBy: {
    id: string;
  };
};


export type FormSubmission = {
  username: string;
  password: string;
  acceptTerms: boolean;
  birthday: Date;
  description: string;
};

