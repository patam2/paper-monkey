import { Queue, Job, Worker } from 'bullmq';
import { QueueEvents } from 'bullmq';
import { getNewsletterById } from '../utils/database/newsletter';
import ComposeEmail, { sendEmail } from './composeemail';
import { getUserById } from '../utils/database/users';
const queueEvents = new QueueEvents('newsletter-processing');

export const emailQueue = new Queue('newsletter-processing', {
  connection: { url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` },
});

export const processNewsletter = new Worker(
  'newsletter-processing',
  async (job: Job) => {
    const newsletter = await getNewsletterById(parseInt(job.id!.split(':')[2], 10))
    console.log(newsletter)
    const emailBody = await ComposeEmail(newsletter!)
    
    const userData = await getUserById(newsletter!.userid)
    sendEmail(userData!.email, emailBody)
  },
  { connection: { url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` } },
);



export const deleteNewsletter = async (newsletterId: number) => {
  const result = await emailQueue.remove(`newsletterid:${newsletterId}`)
  return (result === 1)
}


export const addNewNewsletter = async (jobId: number, time: string) => {
  const splitTime = time.split(':');
  const hours = splitTime[0]
  const minutes = splitTime[1]
  const queueELem = await emailQueue.upsertJobScheduler( 
    `newsletterid:${jobId.toString()}`,
    {
      pattern: `0 ${minutes} ${hours} * * *`
    },
    {
      'name': 'processNewsletter',
    }
  )
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
