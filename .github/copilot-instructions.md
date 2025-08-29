# CCS Telecom Benefits Website

CCS Telecom Benefits is a static HTML website showcasing telecommunication service benefits for customers. It features an interactive comparison tool for different service levels, benefits overview, and customer support links.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Repository Setup
- Clone and navigate to the repository:
  ```bash
  cd /path/to/beneficios-ccs250
  ```
- **NO BUILD REQUIRED**: This is a static HTML website with no build system, package.json, or dependencies.
- **NO INSTALLATION REQUIRED**: All code is self-contained in a single HTML file.

### Running the Website
- **ALWAYS use a local web server** - do not open the HTML file directly in a browser:
  ```bash
  python3 -m http.server 8000
  ```
  - Server starts in **under 1 second**
  - Website loads in **under 50ms**
  - Navigate to `http://localhost:8000/` in your browser
- **Alternative servers** (if Python not available):
  ```bash
  # Node.js (if available)
  npx serve .
  
  # PHP (if available)
  php -S localhost:8000
  ```

### Validation Scenarios
- **ALWAYS test interactive functionality** after making changes:
  1. **Level Comparison Test**: Click different level buttons (Nível 1, 2, 3) and verify:
     - Content updates dynamically 
     - Voucher validity changes (Nível 1: 90 days, Nível 2: 60 days, Nível 3: 60 days)
     - Plan requirements are displayed correctly (250 MB → 450 MB → 650 MB)
     - Premium attractions status changes (Nível 1-2: "não incluídas", Nível 3: "incluídas")
     - Action buttons update appropriately
  2. **Navigation Test**: Click navigation dock buttons and verify smooth scrolling to sections
  3. **FAQ Test**: Click FAQ items to test expand/collapse functionality
  4. **Responsive Test**: Resize browser window to test mobile responsiveness

### Visual Validation
- **ALWAYS take a screenshot** when testing UI changes to verify layout integrity
- Check that all sections render properly:
  - Header with logo and level indicators
  - Conecta Clube comparison section
  - CCS PLAY + CCS TV section
  - Skeelo, Support, and Indique & Ganhe sections
  - FAQ section
  - Navigation dock at bottom

## Codebase Structure

### Repository Layout
```
.
├── .git/
├── .github/
│   └── copilot-instructions.md
├── img/                    # Image assets (PNG files)
│   ├── APP.png
│   ├── ICONCONCTACLUBE.png
│   ├── REPRESENTANTE COMERCIAL.png
│   └── [other PNG files]
└── index.html             # Main website file (1095 lines)
```

### Key Features in index.html
- **Lines 1-12**: HTML5 document setup and meta tags
- **Lines 13-225**: CSS styles with CSS custom properties and responsive design
- **Lines 225-400**: Header section with logos and level indicators  
- **Lines 400-700**: Main content sections (Conecta Clube, CCS PLAY, etc.)
- **Lines 700-900**: FAQ section and footer
- **Lines 900-1095**: JavaScript for interactivity (level switching, navigation, animations)

### Technology Stack
- **Pure HTML5**: Semantic markup with accessibility features
- **Modern CSS**: Custom properties, flexbox, grid, responsive design
- **Vanilla JavaScript**: Interactive features, smooth scrolling, DOM manipulation
- **External Resources**: CDN images from jsdelivr.net, Google Play Store, Framer

## Common Tasks

### Making Content Changes
- **Text Updates**: Edit content directly in the HTML
- **Styling Changes**: Modify CSS variables in the `:root` section (lines 14-28)
- **Interactive Behavior**: Update JavaScript functions (lines 900+)

### Testing External Links
- **IMPORTANT**: Many external resources may be blocked in sandboxed environments
- **WhatsApp Links**: `https://wa.me/554732634700?text=...` (Support)
- **App Store Links**: `https://onelink.to/ccsplay` (CCS PLAY app)
- **Payment Portal**: `https://ccs.pix.7az.com.br/` (PIX payments)

### Quick Commands Reference
```bash
# Start local server
python3 -m http.server 8000

# Check file structure  
ls -la

# View HTML file size
wc -l index.html  # Should show 1095 lines

# Check Git status
git status

# View image assets
ls -la img/
```

### Common File Outputs
#### Repository Root
```
total 80
drwxr-xr-x 4 runner docker  4096 Aug 29 20:48 .
drwxr-xr-x 3 runner docker  4096 Aug 29 20:47 ..
drwxr-xr-x 7 runner docker  4096 Aug 29 20:48 .git
drwxr-xr-x 2 runner docker  4096 Aug 29 20:48 img
-rw-r--r-- 1 runner docker 63254 Aug 29 20:48 index.html
```

#### Image Directory
```
APP.png
ICONCONCTACLUBE.png
REPRESENTANTE COMERCIAL.png
indique-ganhe.png
logoindiqueeganha.png
portal-app.png
portal.png
sospremium.png
suporte-premium.png
```

## Troubleshooting

### Common Issues
- **External images not loading**: Normal in sandboxed environments - core functionality still works
- **Console errors about blocked resources**: Expected behavior, does not affect website operation
- **Links opening in browser**: External links are functional but may be blocked in testing environments

### Performance Expectations
- **File operations**: Under 5ms for basic commands
- **Server startup**: Under 1 second
- **Page loading**: Under 50ms for local access
- **No builds or compilation**: Changes are immediately visible on page refresh

### Validation Checklist
Before committing changes:
- [ ] Local server starts successfully
- [ ] Website loads without critical JavaScript errors
- [ ] Level comparison functionality works (click different nivel buttons)
- [ ] Navigation dock scrolls to correct sections
- [ ] Mobile responsive design maintained
- [ ] All interactive elements respond to user input
- [ ] Visual layout remains intact across different screen sizes

## Key Benefits of This Architecture
- **Zero build time**: Immediate feedback when making changes
- **Simple deployment**: Single HTML file can be served by any web server
- **No dependencies**: Self-contained with all styles and scripts embedded
- **Fast iteration**: Edit, save, refresh - no compilation steps
- **Portable**: Works on any platform with a web browser and basic HTTP server

## Working with Images
- **Local images**: Stored in `img/` directory with descriptive names
- **External images**: Loaded from CDNs (may be blocked in sandboxed environments)
- **NEVER modify images**: Images are referenced by external systems and partners
- **Adding new images**: Place in `img/` directory and reference with relative paths