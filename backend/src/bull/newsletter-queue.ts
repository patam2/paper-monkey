import { Queue, Job, Worker } from 'bullmq';
import { QueueEvents } from 'bullmq';
import { getNewsletterByNewsletterId } from '../utils/database/newsletter';


const queueEvents = new QueueEvents('newsletter-processing');

export const emailQueue = new Queue('newsletter-processing', {
  connection: { url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` },
});

export const processNewsletter = new Worker(
  'newsletter-processing',
  async (job: Job) => {
    console.log(job.id);
    const newsletter = await getNewsletterByNewsletterId(parseInt(job.id!.split(':')[1], 10))
    console.log(newsletter)
  },
  { connection: { url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` } },
);

export const addNewNewsletter = async (jobId: number) => {
  const queueELem = await emailQueue.add('processNewsletter', {}, { 'jobId':  `newsletterid:${jobId.toString()}`, delay: 60000});
  return queueELem.id;
};


queueEvents.on('waiting', ({ jobId }) => {
  console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', ({ jobId, prev }) => {
  console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`${jobId} has failed with reason ${failedReason}`);
});

//export const deleteNewsletter = async (jobId: number) {
//    await emailQueue.removeRepeatableByKey('')
//}
