# Figma Make Prompt for SwagLab.ai Chat UI

## Project Overview
Create a modern, ChatGPT-inspired UI for SwagLab.ai - an AI-powered apparel design generation platform. The app uses conversational AI to gather brand information and generate custom designs.

## Core User Flow
1. User starts a new job/project
2. Chat interface gathers brand information (URL, logo, brand details)
3. AI generates 6-12 design variations
4. User selects and refines designs
5. User views designs on apparel mockups

## Design Requirements

### Layout Structure
- **Left Sidebar**: Project/job list (similar to ChatGPT's chat history)
- **Main Chat Area**: Conversational interface for gathering information
- **Right Panel**: Contextual information (brand details, progress, etc.)

### Key Screens to Design

#### 1. Welcome/New Project Screen
- Clean, modern landing with "Start New Design Project" button
- Brief explanation of the process
- Recent projects list
- Brand colors: Primary blue (#3498db), Secondary gray (#2c3e50)

#### 2. Chat Interface - Initial Questions
- ChatGPT-style message bubbles
- User avatar on right, AI avatar on left
- Typing indicator for AI responses
- Input field with send button
- Suggested quick responses/buttons

**Sample Conversation Flow:**
- AI: "Hi! I'm here to help you create amazing apparel designs. Do you have a website, Instagram page, or any URL I can use to learn about your brand?"
- User options: "Yes, I have a URL" | "No, let's start from scratch" | "I have a logo to upload"
- AI: "Great! Please share the URL and I'll analyze your brand to create designs that match your style."

#### 3. Brand Information Gathering
- Form-like interface within chat
- Progress indicator showing required fields
- Image upload area for logos
- URL input with preview
- Brand personality selection (modern, playful, professional, etc.)
- Industry dropdown
- Color palette picker
- Design style preferences

#### 4. Design Generation Progress
- Loading animation with progress bar
- Real-time status updates
- Estimated time remaining
- Preview of current generation step
- Cancel option

#### 5. Design Selection Gallery
- Grid layout showing 6-12 design variations
- Each design in a card with:
  - Large preview image
  - Design name/title
  - Quick stats (style, colors used)
  - Select/Modify buttons
- Filter options (by style, color, etc.)
- "Generate More" button

#### 6. Design Modification Interface
- Side-by-side view: original design | modified design
- Editing tools panel:
  - Color adjustments
  - Text modifications
  - Style changes
  - Element repositioning
- Before/after comparison
- Save changes button

#### 7. Apparel Mockup View
- 3D-style apparel visualization
- Multiple product types (t-shirts, hoodies, hats, etc.)
- Color variations
- Size selection
- Zoom and rotate controls
- "Add to Cart" or "Save Design" buttons

#### 8. Project Management Sidebar
- List of all user projects
- Project status indicators
- Search/filter projects
- Create new project button
- Project preview thumbnails

### UI Components to Include

#### Chat Components
- Message bubbles (user/AI)
- Typing indicator
- File upload area
- Quick reply buttons
- Progress indicators
- Error states

#### Form Components
- Text inputs with labels
- Dropdown selectors
- Color picker
- Image upload with preview
- Checkbox groups
- Radio button groups

#### Design Gallery Components
- Design cards with hover effects
- Grid layout with responsive breakpoints
- Filter sidebar
- Search bar
- Pagination controls

#### Apparel Components
- 3D product viewer
- Color swatches
- Size selector
- Product information panel
- Action buttons

### Visual Design System

#### Colors
- Primary: #3498db (Blue)
- Secondary: #2c3e50 (Dark Gray)
- Success: #27ae60 (Green)
- Warning: #f39c12 (Orange)
- Error: #e74c3c (Red)
- Background: #f8f9fa (Light Gray)
- Text: #2c3e50 (Dark Gray)
- Text Light: #7f8c8d (Medium Gray)

#### Typography
- Headers: Inter, 600 weight
- Body: Inter, 400 weight
- Chat messages: Inter, 400 weight
- UI elements: Inter, 500 weight

#### Spacing
- Consistent 8px grid system
- Chat message padding: 16px
- Card padding: 24px
- Section margins: 32px

#### Interactive States
- Hover effects on all clickable elements
- Loading states with skeleton screens
- Error states with helpful messages
- Success states with confirmation

### Responsive Considerations
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly button sizes
- Swipe gestures for design gallery
- Optimized chat interface for mobile

### Accessibility Features
- High contrast mode option
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Alt text for all images

## Specific Figma Make Instructions

1. **Create a comprehensive design system** with all the components listed above
2. **Design all 8 main screens** with realistic content and interactions
3. **Include hover states and micro-interactions** for key elements
4. **Create a mobile version** of the chat interface
5. **Add realistic sample data** (brand names, design examples, etc.)
6. **Include loading and error states** for better UX
7. **Make the design feel modern and professional** like ChatGPT but with a design-focused twist
8. **Ensure the layout is clean and uncluttered** with plenty of white space
9. **Include realistic brand examples** (e.g., "TechStartup Co.", "EcoFashion Brand", etc.)
10. **Add subtle animations and transitions** to make the interface feel alive

## Brand Personality
The UI should feel:
- **Professional yet approachable** - like a design consultant
- **Creative and inspiring** - encouraging users to explore
- **Efficient and smart** - getting to results quickly
- **Modern and clean** - following current design trends
- **Trustworthy** - users feel confident in the AI's abilities

## Additional Notes
- Include realistic sample conversations that show the AI's personality
- Show the progression from initial questions to final designs
- Include error handling (e.g., "I couldn't access that URL, let's try another approach")
- Show how the AI learns and adapts based on user feedback
- Include examples of different brand types (tech, fashion, food, etc.)

This prompt will help create a comprehensive set of mockups that can guide the development of your SwagLab.ai chat interface.
