export type SessionData = {
  user: {
    name: string | null;
    image: string;
    email: string;
    id: string;
  };
  expires: string;
};

export type FormData = {
  id: string;
  name: string;
  description: string;
  answerId: number;
};


export type FormSubmission = {
  id: string;
  username: string;
  password: string;
  acceptTerms: boolean;
  birthday: Date;
  description: string;
};


export type FinishedCard = {
  formId: string;
  formName: string;
  formDescription: string;
  answerId: string;
}
