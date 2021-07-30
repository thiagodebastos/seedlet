export interface IJobRepo {
  exists (jobId: JobId): Promise<boolean>;
  save (job: Job): Promise<void>;
  delete (jobId: JobId): Promise<void>;
}
