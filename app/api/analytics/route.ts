import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.event) {
            return NextResponse.json({ error: "Event name is required" }, { status: 400 });
        }

        const analytic = await prisma.analytics.upsert({
            where: { event: body.event },
            update: { count: { increment: 1 } },
            create: { event: body.event, count: 1 },
        });

        return NextResponse.json(
            { message: "Event tracked", count: analytic.count },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error tracking analytics:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
