# UX Synthesizer - Quick Reference

## 🚀 Get Started in 3 Steps

1. **Add API Key** (Optional - demo data works without it)
   ```
   Edit .env.local:
   OPENAI_API_KEY=your_key_here
   ```

2. **Start Server** (Already running!)
   ```
   http://localhost:3000
   ```

3. **Try It Out**
   - Upload `sample-research-data.txt` OR
   - Paste your own research data
   - Click "Analyze Research Data"

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main landing page |
| `app/api/analyze/route.ts` | AI analysis logic |
| `components/UploadSection.tsx` | File upload UI |
| `components/InsightsDisplay.tsx` | Results display |
| `components/PersonaCard.tsx` | Persona visualization |
| `components/AffinityMap.tsx` | Affinity mapping |
| `.env.local` | API key storage |

## 🎨 What You Get

✅ **Pain Points** - User frustrations & obstacles  
✅ **Motivations** - Core user drivers  
✅ **Themes** - Emerging patterns with quotes  
✅ **Affinity Map** - Clustered insights  
✅ **Personas** - 2-3 user archetypes  

## 🔧 Customization Tips

**Change AI Model:**
```typescript
// app/api/analyze/route.ts
model: 'gpt-4o' // or 'gpt-4', 'gpt-3.5-turbo'
```

**Adjust Colors:**
```typescript
// components/*.tsx - Edit Tailwind classes
className="bg-indigo-600" // Change to any color
```

**Add More Insights:**
Edit the system prompt in `app/api/analyze/route.ts`

## 📊 Best Practices

- **Input:** 1000-5000 words optimal
- **Format:** Plain text works best
- **Privacy:** Remove PII before uploading
- **Quality:** Include direct quotes
- **Mix:** Combine interviews + surveys + observations

## 🐛 Common Issues

**"Invalid API key"**
→ Restart server after editing `.env.local`

**Slow analysis**
→ Normal - AI takes 10-30 seconds for large data

**No insights generated**
→ Check that data is at least 500 words

## 📚 Sample Data Included

Use `sample-research-data.txt` to test:
- Interview transcripts
- Usability testing notes
- Survey comments
- Real-world UX research patterns

## 🚢 Deploy

**Vercel (easiest):**
1. Push to GitHub
2. Import in Vercel
3. Add `OPENAI_API_KEY` env var
4. Deploy!

## 💡 Next Ideas

- Export to PDF/PowerPoint
- Save analysis history
- Team collaboration features
- Multi-language support
- Journey mapping
- Sentiment analysis

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions!
