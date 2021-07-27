import {AggregateRoot} from '@/shared/core/domain/AggregateRoot'

enum SalaryType {
  ANNUAL_PACKAGE,
  ANNUAL_COMMISSION,
  COMISSION_ONLY,
  HOURLY,
  PROJECT
}

enum WorkType {
  CASUAL,
  CONTRACT,
  FULL_TIME,
  PART_TIME,
  PROJECT
}

interface JobProps {
  id: string;
  title: string;
  descroption: string;
  workType: WorkType;
  salaryType: SalaryType;
  companyName: string;
  companyEmail: string;
  companyNumber: string;
  salaryMin: number;
  salaryMax: number;
  createdAt: Date;
  updatedAt: Date;
  expiresOn: Date;
}

export class Job extends AggregateRoot<JobProps> {

}
