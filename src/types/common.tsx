export interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export interface Link {
  id: string;
  title: string;
  url: string;
}
export interface Participant {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}
