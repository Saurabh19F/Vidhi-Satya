import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import VisitorStat from "@/models/VisitorStat";

const COUNTER_KEY = "global";

export async function GET() {
  try {
    await connectToDatabase();
    const doc = await VisitorStat.findOne({ key: COUNTER_KEY }).lean<{ totalVisits?: number } | null>();
    return ok({ count: doc?.totalVisits ?? 0 });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch visitor count.", 500);
  }
}

export async function POST() {
  try {
    await connectToDatabase();
    const updated = await VisitorStat.findOneAndUpdate(
      { key: COUNTER_KEY },
      { $inc: { totalVisits: 1 }, $setOnInsert: { key: COUNTER_KEY } },
      { new: true, upsert: true }
    ).lean<{ totalVisits?: number } | null>();

    return ok({ count: updated?.totalVisits ?? 0 }, "Visitor count updated.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update visitor count.", 500);
  }
}
