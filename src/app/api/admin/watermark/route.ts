import { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, rgb } from "pdf-lib";
import multer from "multer";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

const upload = multer({ dest: "uploads/" });

const uploadMiddleware = promisify(upload.single("file"));

export async function POST(req: Request, res: NextApiResponse) {
  await uploadMiddleware(req as any, res as any);

  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const fileBlob = new Blob([file]);
    const buffer = Buffer.from(await fileBlob.arrayBuffer());

    const pdfDoc = await PDFDocument.load(buffer);

    const watermarkImage = await pdfDoc.embedJpg(
      fs.readFileSync(path.resolve("./public/watermark.jpg")),
    );
    const pages = pdfDoc.getPages();
    const { width, height } = pages[0]!.getSize();

    pages.forEach((page) => {
        const x = width - 80;
        const y = 50;
        const watermarkWidth = 50;
        const watermarkHeight = 50;
  
        page.drawImage(watermarkImage, {
          x: x,
          y: y,
          width: watermarkWidth,
          height: watermarkHeight,
          opacity: 0.3,
        });
      });

    const pdfBytes = await pdfDoc.save();
    await writeFile(
        path.join(process.cwd(), "public/"+ "watermarked.pdf"),
        pdfBytes
      );
    return NextResponse.json({ url: "/assets/watermarked.pdf" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process PDF" });
  }
}

export async function DELETE(req: Request, res: NextApiResponse){
    const filePath = path.resolve('./public/watermarked.pdf');
    try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          return NextResponse.json({ message: 'Deleted watermarked PDF file successfully' });
        } else {
          return NextResponse.json({ error: 'Watermarked PDF file not found' });
        }
      } catch (error) {
        console.error('Error deleting PDF file:', error);
        return NextResponse.json({ error: 'Failed to delete watermarked PDF file' });
      }
}