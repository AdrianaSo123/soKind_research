# UX Synthesizer

An AI-powered tool that transforms raw UX research data into organized, actionable insights.

## Features

- 🧠 **AI-Powered Analysis**: Upload interview transcripts, survey comments, and usability notes
- 🎯 **Pain Points & Motivations**: Automatically surface user pain points and core motivations
- 📊 **Theme Identification**: Discover emerging themes with supporting quotes
- 👥 **Persona Generation**: Create draft user personas based on research data
- 🗂️ **Affinity Mapping**: Visualize clustered insights in interactive affinity maps
- ⚡ **Fast Results**: Get insights in minutes, not hours

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at https://platform.openai.com)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_actual_api_key_here
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload Research Data**: Click to upload a file or paste your research data directly
   - Supports interview transcripts, survey responses, usability notes
   - Accepts .txt, .doc, .docx, .pdf files

2. **Analyze**: Click "Analyze Research Data" to process your content

3. **Review Insights**: Explore the generated insights:
   - User pain points
   - Motivations and drivers
   - Emerging themes with quotes
   - Affinity map visualization
   - User personas

4. **Export & Use**: Use the insights to inform your design decisions

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4
- **Icons**: Lucide React

## Project Structure

```
ux-synthesizer/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # AI analysis API endpoint
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── UploadSection.tsx         # File upload & text input
│   ├── InsightsDisplay.tsx       # Main insights display
│   ├── PersonaCard.tsx           # Persona visualization
│   └── AffinityMap.tsx           # Affinity mapping display
└── .env.local                    # Environment variables
```

## Development

### Customizing AI Analysis

Edit the system prompt in `/app/api/analyze/route.ts` to:
- Change the analysis framework
- Adjust the number of insights generated
- Add new analysis dimensions
- Customize persona templates

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT License - feel free to use this project for your own research needs!

---

Built with ❤️ for UX researchers who want to spend less time organizing data and more time understanding users.

