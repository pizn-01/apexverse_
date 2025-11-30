# Testimonials Dynamic Extraction System

## 🎯 Overview

The ApexVerse testimonials system allows you to dynamically extract and display customer testimonials from social media platforms (X/Twitter and Instagram). The system automatically extracts:

- **Author Name**: The person who posted the testimonial
- **Author Handle**: Their social media handle (e.g., @username)
- **Content**: The actual testimonial text
- **Image URL**: Profile or post image (Instagram only)
- **Post URL**: Link to the original post

## 🔧 How It Works

### Architecture

```
User submits URL → Frontend → Backend API → Social Media oEmbed API → Parse & Extract → Database → Display
```

1. **User Input**: Admin enters a social media post URL
2. **API Request**: Frontend sends URL to backend extraction endpoint
3. **oEmbed Fetch**: Backend calls the platform's oEmbed API
4. **HTML Parsing**: Server parses HTML response using JSDOM
5. **Data Extraction**: Extracts author, handle, and content
6. **Database Storage**: Saves to Supabase PostgreSQL
7. **Display**: Testimonials appear on homepage

### Supported Platforms

#### ✅ X (Twitter)
- **Status**: Fully functional
- **API**: Twitter oEmbed API (public, no auth required)
- **Extraction**: Automatic
- **Data Retrieved**:
  - Author name
  - Author handle (@username)
  - Tweet content (cleaned text)
  - Post URL

#### ⚠️ Instagram
- **Status**: Limited (requires Meta App credentials)
- **API**: Instagram oEmbed API (requires authentication)
- **Extraction**: Manual fallback
- **Data Retrieved** (when working):
  - Author name
  - Author handle
  - Caption/content
  - Thumbnail image URL

## 📝 Usage Guide

### Adding a Testimonial from X/Twitter

1. **Navigate to Admin Panel**
   - Local: `http://localhost:5000/testimonials-admin`
   - Production: `https://apexverse.site/testimonials-admin`

2. **Select Platform**
   - Click the "X (Twitter)" button

3. **Enter Post URL**
   - Copy the tweet URL (e.g., `https://x.com/username/status/1234567890`)
   - Paste into the "Post URL" field
   - **Note**: Both `twitter.com` and `x.com` URLs are supported

4. **Extract Content**
   - Click the "Extract" button
   - Wait for extraction (usually 1-2 seconds)
   - The system will automatically fill:
     - Author Name
     - Author Handle
     - Testimonial Content

5. **Review & Submit**
   - Review the extracted content
   - Edit if needed
   - Click "Add Testimonial"

6. **Verify**
   - Testimonial appears in the list on the right
   - Check homepage to see it displayed

### Adding a Testimonial from Instagram

1. **Select Platform**
   - Click the "Instagram" button

2. **Enter Post URL**
   - Copy the Instagram post URL (e.g., `https://www.instagram.com/p/ABC123/`)
   - Paste into the "Post URL" field

3. **Try Extraction** (may fail)
   - Click "Extract" button
   - If successful, content will auto-fill
   - If it fails (likely), proceed to manual entry

4. **Manual Entry**
   - Fill in manually:
     - Author Name: The Instagram username
     - Author Handle: @username
     - Content: Copy the caption from Instagram
     - Image URL: (optional) Right-click post image → Copy image address

5. **Submit**
   - Click "Add Testimonial"

## 🔍 Technical Details

### X/Twitter Extraction Process

```typescript
// 1. Normalize URL (handle both twitter.com and x.com)
const normalizedUrl = url.replace('twitter.com', 'x.com');

// 2. Call oEmbed API
const response = await fetch(
  `https://publish.twitter.com/oembed?url=${encodeURIComponent(normalizedUrl)}`
);

// 3. Parse HTML response using JSDOM
const dom = new JSDOM(data.html);
const document = dom.window.document;

// 4. Extract tweet text from blockquote
const blockquote = document.querySelector('blockquote');
const paragraphs = blockquote.querySelectorAll('p');
const content = paragraphs[0].textContent.trim();

// 5. Extract author info
const authorName = data.author_name;
const authorHandle = '@' + data.author_url.split('/').pop();
```

### API Endpoints

#### `POST /api/testimonials/extract-x`
Extracts content from X/Twitter post.

**Request:**
```json
{
  "url": "https://x.com/username/status/1234567890"
}
```

**Response:**
```json
{
  "authorName": "John Doe",
  "authorHandle": "@johndoe",
  "content": "This is an amazing service! Highly recommend...",
  "html": "<blockquote>...</blockquote>"
}
```

#### `POST /api/testimonials/extract-instagram`
Attempts to extract content from Instagram post.

**Request:**
```json
{
  "url": "https://www.instagram.com/p/ABC123/"
}
```

**Response (if successful):**
```json
{
  "authorName": "Jane Smith",
  "authorHandle": "@janesmith",
  "content": "Love this product!",
  "imageUrl": "https://instagram.com/..."
}
```

#### `POST /api/testimonials`
Creates a new testimonial.

**Request:**
```json
{
  "platform": "x",
  "postUrl": "https://x.com/username/status/123",
  "authorName": "John Doe",
  "authorHandle": "@johndoe",
  "content": "Great service!",
  "imageUrl": "https://..." // optional
}
```

#### `GET /api/testimonials`
Retrieves all testimonials.

**Response:**
```json
[
  {
    "id": "uuid",
    "platform": "x",
    "postUrl": "https://...",
    "authorName": "John Doe",
    "authorHandle": "@johndoe",
    "content": "Great service!",
    "imageUrl": null,
    "createdAt": "2025-12-01T00:00:00.000Z"
  }
]
```

#### `DELETE /api/testimonials/:id`
Deletes a testimonial.

## 🧪 Testing the Extraction Feature

### Test with Real Tweets

1. **Find a public tweet** mentioning your service
2. **Copy the URL** (e.g., `https://x.com/elonmusk/status/1234567890`)
3. **Go to admin panel** at `/testimonials-admin`
4. **Select X platform**
5. **Paste URL and click Extract**
6. **Verify** that:
   - Author name is correct
   - Handle includes @ symbol
   - Content is the tweet text (without URL at the end)
   - No HTML tags in content

### Test with Sample URLs

**Working X/Twitter URLs:**
```
https://x.com/NASA/status/1234567890
https://twitter.com/SpaceX/status/9876543210
```

**Instagram URLs (may require manual entry):**
```
https://www.instagram.com/p/ABC123/
https://www.instagram.com/reel/XYZ789/
```

### Automated Testing Script

Run the database verification script:
```bash
npm run db:verify
```

This will:
- Test database connection
- Verify tables exist
- Test INSERT/DELETE operations
- Confirm testimonials feature is working

## 🐛 Troubleshooting

### Issue: "Failed to extract content from X post"

**Possible Causes:**
1. Tweet is private or deleted
2. Invalid URL format
3. Network/firewall blocking oEmbed API

**Solutions:**
- Verify the tweet is public
- Check URL format (should be `https://x.com/username/status/ID`)
- Try with `twitter.com` instead of `x.com`
- Enter details manually if extraction fails

### Issue: "Instagram API requires authentication"

**Cause:**
Instagram's oEmbed API requires Meta App credentials (as of 2024).

**Solution:**
Enter testimonial details manually:
1. Open Instagram post in browser
2. Copy username → Author Name
3. Copy @handle → Author Handle
4. Copy caption → Content
5. Right-click image → Copy image address → Image URL

### Issue: Content has HTML tags or extra text

**Cause:**
HTML parsing didn't clean the content properly.

**Solution:**
- Edit the content field manually before submitting
- Remove any HTML tags or unwanted text
- The system should auto-clean, but manual review is recommended

### Issue: Testimonials not appearing on homepage

**Possible Causes:**
1. Database not connected
2. Frontend not fetching testimonials
3. Testimonials component not rendering

**Solutions:**
1. Check database connection: `npm run db:verify`
2. Check browser console for API errors
3. Verify `/api/testimonials` returns data
4. Check Supabase table has records

## 📊 Monitoring & Maintenance

### Check Extraction Success Rate

Monitor server logs for extraction attempts:
```
✅ Extracted X content from @username
❌ Error extracting X content: ...
```

### Database Queries

**Count testimonials by platform:**
```sql
SELECT platform, COUNT(*) as count
FROM testimonials
GROUP BY platform;
```

**Recent testimonials:**
```sql
SELECT author_name, platform, created_at
FROM testimonials
ORDER BY created_at DESC
LIMIT 10;
```

**Find failed extractions** (empty content):
```sql
SELECT id, post_url, author_name
FROM testimonials
WHERE content = '' OR content IS NULL;
```

## 🔐 Security Considerations

1. **URL Validation**: System validates URLs before extraction
2. **Rate Limiting**: Consider adding rate limits to extraction endpoints
3. **Content Sanitization**: Content is stored as plain text (no HTML execution)
4. **Authentication**: Consider adding auth to `/testimonials-admin` route
5. **CORS**: Ensure API endpoints have proper CORS configuration

## 🚀 Future Enhancements

### Potential Improvements

1. **Instagram Authentication**
   - Integrate Meta App credentials
   - Enable automatic Instagram extraction

2. **LinkedIn Support**
   - Add LinkedIn post extraction
   - Support LinkedIn recommendations

3. **Bulk Import**
   - Upload CSV of testimonial URLs
   - Batch extraction and import

4. **Content Moderation**
   - Auto-filter inappropriate content
   - Sentiment analysis
   - Spam detection

5. **Analytics**
   - Track which testimonials get most views
   - A/B test different testimonial displays
   - Engagement metrics

6. **Scheduled Refresh**
   - Auto-update testimonials from followed accounts
   - Periodic re-fetch to get updated metrics (likes, retweets)

## 📚 Resources

- **Twitter oEmbed API**: https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
- **Instagram oEmbed**: https://developers.facebook.com/docs/instagram/oembed
- **JSDOM Documentation**: https://github.com/jsdom/jsdom
- **Supabase Docs**: https://supabase.com/docs

---

**Last Updated**: December 1, 2025
**System Status**: ✅ Operational
**X Extraction**: ✅ Working
**Instagram Extraction**: ⚠️ Manual Entry Required
