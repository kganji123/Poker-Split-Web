# PokerSplit — Private Family Poker Leagues

**Live at:** [pokersplit.com](https://pokersplit.com) (via GitHub Pages)

Track, split, and settle your family poker nights with smart chip tracking, automatic family-vs-family settlements, and full league history.

---

## 🚀 Quick Deploy to GitHub Pages

Your repo: **Kganji123/poker-split-web**

### Step 1: Upload Files

```bash
# Clone your repo (if not already)
git clone https://github.com/Kganji123/poker-split-web.git
cd poker-split-web

# Copy all 5 HTML files to the root
# (index.html, hand-history.html, poker-hands.html, leaderboard.html, settlement.html)

# Commit and push
git add .
git commit -m "Deploy PokerSplit v1.0 - Full app with all features"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to: `https://github.com/Kganji123/poker-split-web/settings/pages`
2. **Source:** Deploy from a branch
3. **Branch:** `main` / `root`
4. **Save**

Your site will be live at: **https://kganji123.github.io/poker-split-web**

### Step 3: Custom Domain (pokersplit.com)

Already configured! Your DNS points to GitHub Pages. Just make sure:

1. In repo settings → Pages → Custom domain: enter `pokersplit.com`
2. Check "Enforce HTTPS"
3. Wait 5-10 minutes for SSL certificate

---

## 📱 What's Included

### **5 Complete Pages**

| Page | What's inside | Lines | Size |
|------|--------------|-------|------|
| **index.html** | Game setup, live session tracking, chip counts, settlements, dashboard | 1,927 | 106KB |
| **hand-history.html** | Record hands, history, stats, player rankings | 1,626 | 69KB |
| **poker-hands.html** | Visual hand rankings reference (Royal Flush → High Card) | 322 | 18KB |
| **leaderboard.html** | Family standings, player rankings, rivalries, records | 504 | 29KB |
| **settlement.html** | Outstanding balances, mark payments, close outs | 86 | 8KB |

### **Core Features** ✅

- ✅ **Family vs Family settlements** — Automatic debt minimization algorithm
- ✅ **Live session tracking** — Real-time chip counts, rebuys, add-ons
- ✅ **Hand history & stats** — Record winning hands, frequency charts, Royal Flush tracker
- ✅ **League leaderboard** — Family standings, player rankings, head-to-head rivalries

---

## 🎨 Design System

**Color Palette:**
- **Primary:** `#f4b300` — Golden yellow (buttons, highlights, accents)
- **Background:** `#f9c52e` — Warm golden glow
- **Surface:** `#FFFDF8` — Cream cards
- **Text:** `#2C1810` — Deep brown
- **Win:** `#2E7D32` — Forest green
- **Loss:** `#C62828` — Crimson red

**Typography:**
- **Display:** Fraunces (serif) — Headings, hero titles
- **Body:** Plus Jakarta Sans — All UI text
- **Mono:** DM Mono — Money amounts, chip counts

**Mobile-first, fully responsive, PWA-ready**

---

## 💾 Data Storage

Everything runs in **localStorage** — no backend needed!

**Storage key:** `pokersplit_league_v1`

Data structure:
```javascript
{
  league: { name, buyin, startingChips, format },
  families: [
    { id, name, color, members: [...], stats: {...} }
  ],
  sessions: [
    { id, venue, date, players: [...], hands: [...], settlement: {...} }
  ]
}
```

**Export/Import:**
```javascript
// Export
const backup = localStorage.getItem('pokersplit_league_v1');
console.log(backup); // Copy and save

// Import
localStorage.setItem('pokersplit_league_v1', YOUR_BACKUP_JSON);
location.reload();
```

---

## 🔧 Tech Stack

- **Pure HTML/CSS/JS** — No frameworks, no build step
- **Vanilla JavaScript** — 100% dependency-free
- **localStorage** — Client-side persistence
- **GitHub Pages** — Free hosting, automatic SSL
- **PWA-ready** — Install on iPhone via "Add to Home Screen"

**Browser support:** Chrome, Safari, Firefox, Edge (modern versions)

---

## 📖 How to Use

### 1. Create Your League

1. Open `index.html`
2. Tap "Create Your League"
3. Add families (min 2) with members
4. Pick family colors
5. Set buy-in and chip structure

### 2. Start a Session

1. Dashboard → "Start Session"
2. Select players for tonight
3. Tap "Start Session"
4. Track rebuys/add-ons during play
5. Record winning hands (optional)

### 3. End & Settle

1. Tap "End" button
2. Enter final chip counts for each player
3. App calculates net results
4. Settlement algorithm shows minimum transactions
5. Mark payments as paid

### 4. Track History

- **Hand History** page: All recorded hands with stats
- **Leaderboard** page: Family standings, player rankings
- **Settlement** page: Outstanding balances

---

## 🎯 Settlement Algorithm

**Debt Minimization:**

Instead of everyone paying everyone:
```
Marco owes Sofia $20
Sofia owes Leo $20
Leo owes Marco $20
❌ 3 transactions
```

The algorithm consolidates:
```
✅ 0 transactions (net balances cancel out)
```

**How it works:**
1. Calculate net result per player
2. Group by family → family net results
3. Sort creditors (owed) and debtors (owe)
4. Match largest creditor with largest debtor
5. Repeat until all balanced

Result: **Minimum possible transactions**

---

## 🚧 Roadmap (Future Versions)

**v1.1 — Polish**
- [ ] Edit/delete families and players
- [ ] Session notes field
- [ ] Photo uploads for notable hands
- [ ] Share session summaries

**v2.0 — Backend**
- [ ] Real-time sync across devices
- [ ] User accounts & authentication
- [ ] Multiple leagues per user
- [ ] Push notifications

**v3.0 — Premium**
- [ ] Digital poker table mode
- [ ] Payment integration (Venmo/PayPal/CashApp)
- [ ] Season system & championships
- [ ] Advanced analytics & charts

---

## 📝 License

All rights reserved. Private project for pokersplit.com

---

## 🙏 Credits

Built with Design Thinking principles by an AI Engineer specialized in user-centric applications.

**Technologies:**
- Fonts: Google Fonts (Fraunces, Plus Jakarta Sans, DM Mono)
- Icons: Unicode emoji
- Hosting: GitHub Pages
- Domain: pokersplit.com

---

## 📞 Support

Having issues? Open an issue in this repo or check:
1. Browser console for errors
2. localStorage quota (usually 5-10MB limit)
3. HTTPS is enabled for custom domain

**Happy playing! 🃏♠️**
