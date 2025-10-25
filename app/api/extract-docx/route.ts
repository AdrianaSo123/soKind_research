import { NextRequest, NextResponse } from 'next/server';

// Force Node.js runtime
export const runtime = 'nodejs';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use mammoth to extract text from .docx
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    
    return NextResponse.json({ 
      text: result.value,
      messages: result.messages
    });

  } catch (error: any) {
    console.error('DOCX extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract text from Word document', details: error.message },
      { status: 500 }
    );
  }
}
