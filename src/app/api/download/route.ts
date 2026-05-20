import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Allowed files whitelist — only these can be downloaded
const ALLOWED: Record<string, string> = {
  "Wolgan_Brochure.pdf": "Wolgan_Brochure.pdf",
  "NCR_Brochure.pdf": "NCR_Brochure.pdf",
  "Rydlyme_Brochure.pdf": "Rydlyme_Brochure.pdf",
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const file = searchParams.get("file");

  if (!file || !ALLOWED[file]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", ALLOWED[file]);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${ALLOWED[file]}"`,
      "Content-Length": String(fileBuffer.length),
    },
  });
}
