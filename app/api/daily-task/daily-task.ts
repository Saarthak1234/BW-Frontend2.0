
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // 2. Verify the secret token
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // 3. If authorized, run your job logic
  try {
    console.log("Running scheduled task...");
    // Replace this with your actual task logic
    // e.g., await sendEmails(); or await syncDatabase();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error running cron job:", error);
    res.status(500).json({ success: false, error: "Task failed" });
  }
}