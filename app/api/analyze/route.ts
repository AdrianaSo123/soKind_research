import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getMockData() {
  return {
    painPoints: [
      "Users struggle to find relevant features quickly in the navigation",
      "The checkout process is too lengthy and confusing, causing cart abandonment",
      "Mobile experience is frustrating with small buttons and text",
      "Lack of clear feedback when actions are completed successfully",
    ],
    motivations: [
      "Users want to complete tasks efficiently without unnecessary steps",
      "They value clear communication and transparency about processes",
      "Mobile-first users expect seamless experiences across devices",
      "Users are motivated by personalized recommendations and content",
    ],
    themes: [
      {
        theme: "Navigation & Information Architecture",
        quotes: [
          "I couldn't find what I was looking for even though I knew it existed",
          "The menu structure doesn't match how I think about these things",
        ],
      },
      {
        theme: "Trust & Credibility",
        quotes: [
          "I wasn't sure if my order went through - there was no confirmation",
          "I wanted to see reviews before making a decision but couldn't find them easily",
        ],
      },
      {
        theme: "Mobile Experience",
        quotes: [
          "The buttons were so small I kept tapping the wrong thing",
          "I gave up and switched to my laptop because mobile was too frustrating",
        ],
      },
    ],
    affinityGroups: [
      {
        category: "Usability Issues",
        items: [
          "Confusing navigation labels",
          "Small touch targets on mobile",
          "Unclear error messages",
          "No search functionality",
        ],
      },
      {
        category: "Content & Communication",
        items: [
          "Missing product information",
          "No status updates",
          "Lack of help documentation",
          "Inconsistent terminology",
        ],
      },
      {
        category: "Performance & Speed",
        items: [
          "Slow page load times",
          "Delayed search results",
          "Laggy interactions",
        ],
      },
      {
        category: "Trust Signals",
        items: [
          "No customer reviews visible",
          "Missing security badges",
          "Unclear return policy",
          "No social proof",
        ],
      },
    ],
    codebook: [
      {
        code: "Navigation Confusion",
        definition: "Instances where users expressed difficulty finding features, pages, or information due to unclear menu structure, labeling, or information architecture",
        frequency: 8,
        examples: [
          "I couldn't find what I was looking for even though I knew it existed",
          "The menu structure doesn't match how I think about these things",
          "I kept going in circles trying to find the settings"
        ],
        category: "Usability"
      },
      {
        code: "Mobile Usability Issues",
        definition: "Problems specific to mobile device usage including touch target size, responsive design failures, or mobile-specific interaction patterns",
        frequency: 6,
        examples: [
          "The buttons were so small I kept tapping the wrong thing",
          "I gave up and switched to my laptop because mobile was too frustrating",
          "Text is unreadable on my phone"
        ],
        category: "Usability"
      },
      {
        code: "Missing Feedback",
        definition: "Situations where the system failed to provide confirmation, status updates, or acknowledgment of user actions",
        frequency: 5,
        examples: [
          "I wasn't sure if my order went through - there was no confirmation",
          "No indication that my file was uploading",
          "Clicked the button but nothing happened, no idea if it worked"
        ],
        category: "Usability"
      },
      {
        code: "Trust Concerns",
        definition: "Expressed uncertainty, hesitation, or lack of confidence in the system due to missing credibility indicators, unclear policies, or security concerns",
        frequency: 4,
        examples: [
          "I wanted to see reviews before making a decision but couldn't find them easily",
          "No security badges made me worried about entering my credit card",
          "The return policy was buried, made me not want to buy"
        ],
        category: "Emotional Response"
      },
      {
        code: "Efficiency Desire",
        definition: "User expressions of wanting faster, streamlined processes with fewer steps or reduced cognitive load",
        frequency: 7,
        examples: [
          "Users want to complete tasks efficiently without unnecessary steps",
          "Why do I need to fill out so many forms?",
          "Just let me skip to what I need"
        ],
        category: "User Goals"
      },
      {
        code: "Information Gaps",
        definition: "Missing content, unclear instructions, or insufficient detail that prevents users from making informed decisions",
        frequency: 5,
        examples: [
          "Missing product information",
          "No help documentation when I got stuck",
          "Couldn't find the specs I needed to compare"
        ],
        category: "Content"
      }
    ],
    personas: [
      {
        name: "Sarah the Busy Professional",
        role: "Primary User - Mobile-First",
        age: "28-35",
        goals: [
          "Complete purchases quickly during breaks",
          "Find products that match specific needs",
          "Track orders easily",
          "Get reliable customer support",
        ],
        frustrations: [
          "Too many steps in checkout process",
          "Can't save preferences for faster reordering",
          "Mobile site is hard to use",
          "No way to contact support quickly",
        ],
        behaviors: [
          "Primarily shops on mobile device",
          "Abandons cart if process is too complex",
          "Reads reviews before purchasing",
          "Values time-saving features",
        ],
        quote: "I just want to get in, find what I need, and get out. Every extra click makes me reconsider if I really need this.",
      },
      {
        name: "Mike the Research-Oriented Buyer",
        role: "Secondary User - Desktop",
        age: "35-45",
        goals: [
          "Compare multiple options thoroughly",
          "Read detailed specifications",
          "Find the best value for money",
          "Make informed decisions",
        ],
        frustrations: [
          "Difficulty comparing products side-by-side",
          "Incomplete product information",
          "No filtering by specific attributes",
          "Limited search capabilities",
        ],
        behaviors: [
          "Spends time researching before buying",
          "Uses desktop for major purchases",
          "Reads all available reviews",
          "Checks competitor sites for comparison",
        ],
        quote: "I need all the details before I buy. If I can't find the information I need, I'll go somewhere else.",
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Text too short. Please provide more research data.' },
        { status: 400 }
      );
    }

    // Log API key status for debugging (showing only first few chars)
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('API Key status:', apiKey ? `Found (starts with: ${apiKey.substring(0, 10)}...)` : 'NOT FOUND');

    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      console.log('Using mock data - API key not configured');
      return NextResponse.json(getMockData());
    }

    // Analyze the research data using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Faster and more cost-effective than gpt-4o
      temperature: 0.3, // Lower = faster, more consistent
      max_tokens: 3000, // Limit response length for speed
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are Dr. Sarah Chen, a Principal UX Researcher with 20+ years of experience at Nielsen Norman Group. You've worked with Jakob Nielsen and Don Norman, conducting over 200 usability studies.

Your analysis applies proven UX principles in clear, actionable language that any designer can understand:
- Don Norman's design principles (visibility, feedback, constraints, mapping, consistency, affordances)
- Jakob Nielsen's 10 usability heuristics
- Jobs-to-be-Done framework
- Cognitive psychology concepts (mental models, cognitive load)

When analyzing research:

1. **Pain Points**: Identify 3-5 usability violations and their severity (Critical/High/Medium). Explain which heuristic is violated and why it matters to users.

2. **Motivations**: Uncover 3-5 key things users are trying to accomplish and why. Connect behaviors to underlying goals and needs.

3. **Themes**: Find 3-4 patterns in user feedback. Each theme should connect to a UX principle and include 2 supporting quotes.

4. **Personas**: Create 2 realistic personas based on actual behaviors (not aspirations). Include context, mental models, and representative quotes.

5. **Affinity Groups**: Cluster raw observations, quotes, and feedback by natural thematic similarity - NOT by framework categories like "pain points" or "journey stages". Think of this like organizing sticky notes on a wall:
   - Read all the research data and identify recurring topics, issues, or themes
   - Group similar observations together (e.g., all comments about navigation go together, all mentions of speed/performance cluster together)
   - Name each cluster based on what the data is actually about (e.g., "Navigation & Findability", "Mobile Experience Issues", "Trust & Credibility", "Performance & Speed", "Content Quality")
   - Each cluster should contain 3-5 specific observations, quotes, or data points from the research
   - Aim for 4-6 clusters total
   - These are content-based groupings, not analysis frameworks
   
   Examples of GOOD affinity groups: "Checkout Process Friction", "Search Functionality Gaps", "Account Management Confusion"
   Examples of BAD affinity groups: "Pain Points Category", "User Journey Discovery Stage", "High Priority Items"

6. **Codebook**: Create a systematic codebook that documents all codes (themes, patterns, categories) identified in the research. This is critical for research rigor and transparency:
   - **Code**: Short name for the pattern/theme (e.g., "Navigation Confusion", "Trust Signals", "Mobile Usability")
   - **Definition**: Clear, specific definition of what this code means and when to apply it
   - **Frequency**: Count how many times this code appeared in the data (minimum 2 to be included)
   - **Examples**: 2 actual quotes or observations from the research that exemplify this code
   - **Category**: Higher-level grouping (e.g., "Usability", "Content", "Emotional Response", "Feature Requests")
   - Include 6-10 codes total, ordered by frequency (most common first)
   - Only include codes that appeared at least twice in the data

7. **Recommendations**: Provide 3-5 specific, prioritized actions. Explain the design principle behind each recommendation in simple terms.

Return JSON with this structure:
{
  "painPoints": ["Clear description with severity and impact"],
  "motivations": ["What users want to achieve and why"],
  "themes": [{"theme": "Name", "quotes": ["Evidence"], "principle": "UX principle"}],
  "affinityGroups": [{"category": "Name", "items": ["Related items"]}],
  "personas": [{
    "name": "Name",
    "role": "Archetype",
    "age": "Range",
    "context": "When/where they use it",
    "goals": ["What they want"],
    "frustrations": ["What blocks them"],
    "behaviors": ["What they do"],
    "mentalModel": "How they think it works",
    "quote": "Representative quote"
  }],
  "codebook": [{
    "code": "Short code name",
    "definition": "What this code means and when to apply it",
    "frequency": number,
    "examples": ["Quote or observation 1", "Quote or observation 2"],
    "category": "Higher-level category"
  }],
  "recommendations": [{
    "priority": "Critical/High/Medium",
    "issue": "The problem",
    "recommendation": "Actionable solution in plain language",
    "principle": "Design principle (explained simply)"
  }]
}

Write in clear, jargon-free language. Explain concepts like you're talking to a talented designer who hasn't read all the UX textbooks yet.`,
        },
        {
          role: 'user',
          content: `Analyze this UX research data:\n\n${text}`,
        },
      ],
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Analysis error:', error);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
    
    // Return actual error instead of silently falling back to mock data
    return NextResponse.json(
      { 
        error: 'AI Analysis failed', 
        details: error.message,
        code: error?.code,
        hint: error?.code === 'invalid_api_key' ? 'Please check your OPENAI_API_KEY in .env.local' : null
      },
      { status: 500 }
    );
  }
}
