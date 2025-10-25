# UX Synthesizer - Setup Guide

## Quick Start

Your UX Synthesizer application is ready! Follow these steps to get started:

### 1. Set Up OpenAI API Key

To use the AI-powered analysis features, you need an OpenAI API key:

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the key
5. Open the `.env.local` file in the project root
6. Replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-proj-...
   ```

**Note:** The app includes demo/mock data that works without an API key for testing purposes.

### 2. Development Server

The development server is already running at:
- **Local:** http://localhost:3000
- **Network:** http://10.196.67.194:3000

If you need to restart it:
```bash
cd ux-synthesizer
npm run dev
```

### 3. Test the Application

1. Open http://localhost:3000 in your browser
2. You can either:
   - Upload the `sample-research-data.txt` file (included in the project)
   - Paste your own research data
   - Copy-paste from the sample file

3. Click "Analyze Research Data"
4. View the generated insights!

## Project Structure

```
ux-synthesizer/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # AI analysis endpoint
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main landing page
│
├── components/
│   ├── AffinityMap.tsx          # Affinity mapping visualization
│   ├── InsightsDisplay.tsx      # Main insights container
│   ├── PersonaCard.tsx          # User persona cards
│   └── UploadSection.tsx        # File upload & text input
│
├── .env.local                   # Environment variables (API keys)
├── sample-research-data.txt     # Sample data for testing
└── README.md                    # Documentation
```

## Features Overview

### 📊 Analysis Capabilities

1. **Pain Points Detection**
   - Automatically identifies user frustrations and obstacles
   - Extracted from interview transcripts and survey responses
   - Prioritized by frequency and impact

2. **Motivation Discovery**
   - Surfaces core user motivations and drivers
   - Identifies what users value and why
   - Helps understand user goals

3. **Theme Identification**
   - Discovers emerging patterns across research data
   - Groups related insights together
   - Provides supporting quotes from original data

4. **Affinity Mapping**
   - Visualizes clustered insights
   - Color-coded categories
   - Interactive, easy-to-understand format

5. **Persona Generation**
   - Creates 2-3 distinct user personas
   - Includes goals, frustrations, behaviors, and quotes
   - Based on actual research data patterns

## Customization Options

### Modify Analysis Parameters

Edit `/app/api/analyze/route.ts` to customize:

```typescript
// Change the AI model
model: 'gpt-4o',  // or 'gpt-4', 'gpt-3.5-turbo'

// Adjust temperature for creativity
temperature: 0.7,  // 0.0 (focused) to 1.0 (creative)

// Modify the number of outputs
// Edit the system prompt to request different quantities
```

### Customize Visual Design

Edit component files in `/components/` to change:
- Colors and styling (Tailwind CSS classes)
- Layout and structure
- Icons (using Lucide React)

### Add New Analysis Types

In `/app/api/analyze/route.ts`, update the system prompt to request additional outputs like:
- Journey maps
- Empathy maps
- User stories
- Feature requests
- Accessibility insights

## Using Your Own Research Data

### Supported Data Types

- Interview transcripts (PDF, TXT, DOC)
- Survey responses (open-ended questions)
- Usability testing notes
- Customer feedback
- Support ticket data
- User reviews
- Focus group notes
- Research reports (PDF)

### Best Practices

1. **Data Quality:**
   - Include actual quotes when possible
   - Provide context about participants
   - Mix different data sources for richer insights

2. **Data Quantity:**
   - Minimum: ~500 words for meaningful analysis
   - Optimal: 1000-5000 words
   - Maximum: Limited by API constraints (~100,000 characters)

3. **Privacy:**
   - Remove personally identifiable information (PII)
   - Anonymize participant names
   - Keep sensitive company data confidential

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add `OPENAI_API_KEY` environment variable
4. Deploy automatically

### Other Platforms

- **Netlify:** Supports Next.js with Edge Functions
- **Railway:** One-click deployment
- **AWS Amplify:** Full AWS integration
- **DigitalOcean App Platform:** Managed hosting

## Troubleshooting

### API Key Issues

**Error:** "Invalid API key"
- Check that your key starts with `sk-`
- Ensure no extra spaces in `.env.local`
- Restart the dev server after changing env variables

### Build Errors

**TypeScript errors:**
```bash
npx tsc --noEmit
```

**Module not found:**
```bash
rm -rf node_modules
npm install
```

### Performance

**Slow analysis:**
- Check your internet connection
- OpenAI API can take 10-30 seconds for large datasets
- Consider using GPT-3.5-turbo for faster (but less detailed) results

## Next Steps

### Potential Enhancements

1. **Export Functionality**
   - PDF reports
   - CSV data export
   - PowerPoint slides

2. **Collaboration Features**
   - Share analysis links
   - Team commenting
   - Version history

3. **Advanced Analysis**
   - Sentiment analysis
   - Statistical significance
   - Multi-language support

4. **Data Management**
   - Save analyses to database
   - Project organization
   - Batch processing

5. **Visualization**
   - Interactive charts
   - Journey mapping
   - Heatmaps

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **OpenAI API:** https://platform.openai.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev

## Tips for UX Researchers

1. **Combine Data Sources:** Mix interviews, surveys, and observations for richer insights
2. **Iterate:** Run analysis multiple times with different datasets to refine understanding
3. **Human Validation:** Always validate AI insights with your expert judgment
4. **Context Matters:** Provide context in your research data for better analysis
5. **Quote Quality:** Include verbatim quotes for more authentic persona generation

---

Happy researching! 🎯

Built with ❤️ for UX researchers who value both efficiency and empathy.
