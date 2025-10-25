import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// Force Node.js runtime for PDF processing
export const runtime = 'nodejs';

export async function POST(request: NextRequest): Promise<NextResponse> {
  let tempFilePath: string | null = null;
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer and save temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create temporary file
    tempFilePath = join(tmpdir(), `upload-${Date.now()}.pdf`);
    writeFileSync(tempFilePath, buffer);

    // Use pdf2json which works in Node.js without worker issues
    const PDFParser = (await import('pdf2json')).default;
    
    return new Promise<NextResponse>((resolve) => {
      const pdfParser = new (PDFParser as any)(null, 1);
      
      let extractedText = '';
      
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        // Extract text from all pages
        if (pdfData.Pages) {
          pdfData.Pages.forEach((page: any) => {
            if (page.Texts) {
              page.Texts.forEach((text: any) => {
                if (text.R) {
                  text.R.forEach((r: any) => {
                    if (r.T) {
                      try {
                        extractedText += decodeURIComponent(r.T) + ' ';
                      } catch (e) {
                        // If decoding fails, use the raw text
                        extractedText += r.T + ' ';
                      }
                    }
                  });
                }
              });
              extractedText += '\n';
            }
          });
        }
        
        // Clean up temp file
        if (tempFilePath) {
          try {
            unlinkSync(tempFilePath);
          } catch (e) {
            console.error('Failed to delete temp file:', e);
          }
        }
        
        resolve(NextResponse.json({ 
          text: extractedText.trim(),
          pages: pdfData.Pages?.length || 0,
          info: pdfData.Meta || {}
        }));
      });
      
      pdfParser.on('pdfParser_dataError', (err: any) => {
        // Clean up temp file on error
        if (tempFilePath) {
          try {
            unlinkSync(tempFilePath);
          } catch (e) {
            console.error('Failed to delete temp file:', e);
          }
        }
        
        console.error('PDF parsing error:', err);
        resolve(NextResponse.json(
          { error: 'Failed to parse PDF', details: err.message },
          { status: 500 }
        ));
      });
      
      pdfParser.loadPDF(tempFilePath);
    });

  } catch (error: any) {
    // Clean up temp file on error
    if (tempFilePath) {
      try {
        unlinkSync(tempFilePath);
      } catch (e) {
        console.error('Failed to delete temp file:', e);
      }
    }
    
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract text from PDF', details: error.message },
      { status: 500 }
    );
  }
}
