import Location from './Location';
import volunteerModel from './Volunteer';

export default interface fundraiseModel {
  id: number;
  name: string;
  description: string;
  content: string;
  contact_email: string;
  contact_phone: string;
  date: Date;
  image: string;
  location: Location;
  volonteers: volunteerModel[];
}
