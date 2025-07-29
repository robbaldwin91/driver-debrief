# Component Library & Dashboard Application

A comprehensive React application showcasing reusable components, data visualization, and theme customization capabilities.

**Experience Qualities**:
1. **Professional** - Clean, organized interface that demonstrates component library capabilities
2. **Interactive** - Responsive components with clear feedback and smooth navigation  
3. **Customizable** - User-controlled theming and branding options

**Complexity Level**: Light Application (multiple features with basic state)
- Multiple interconnected pages with shared components and state management for themes and user preferences

## Essential Features

### Navigation System
- **Functionality**: Header navigation with links to all pages, footer with app info
- **Purpose**: Provides clear wayfinding and consistent app structure
- **Trigger**: Page load and user clicks
- **Progression**: App loads → Header displays with navigation links → User clicks link → Page transitions smoothly → Footer remains consistent
- **Success criteria**: All pages accessible, active page highlighted, responsive design

### Data Table Page  
- **Functionality**: Displays tabular data with sorting and filtering capabilities
- **Purpose**: Demonstrates data presentation and interaction patterns
- **Trigger**: Navigation to table page
- **Progression**: Page load → Table renders with dummy data → User can sort columns → Filtering works → Data updates responsively
- **Success criteria**: Table displays, sorting functions, responsive layout

### Card Display Page
- **Functionality**: Shows information cards with titles, subtitles, labels and images
- **Purpose**: Showcases card-based layouts and content presentation
- **Trigger**: Navigation to card page  
- **Progression**: Page load → Cards render in grid → User can view card details → Images load properly → Layout adapts to screen size
- **Success criteria**: Cards display correctly, images load, responsive grid

### Data Visualization Page
- **Functionality**: Interactive charts and graphs using D3/Recharts
- **Purpose**: Demonstrates data visualization capabilities
- **Trigger**: Navigation to graph page
- **Progression**: Page load → Charts render with data → User can interact with visualizations → Data updates smoothly
- **Success criteria**: Charts render, interactions work, data is clear

### Project Timeline Page
- **Functionality**: Gantt chart showing project timelines and dependencies
- **Purpose**: Shows complex data visualization for project management
- **Trigger**: Navigation to gantt page
- **Progression**: Page load → Timeline renders → User can view task details → Dependencies are clear → Timeline is interactive
- **Success criteria**: Gantt displays correctly, tasks are readable, timeline is functional

### Component Library Page
- **Functionality**: Showcase of all reusable components with interactive examples
- **Purpose**: Provides component documentation and testing interface
- **Trigger**: Navigation to library page
- **Progression**: Page load → Components display in organized sections → User can interact with examples → Code examples visible
- **Success criteria**: All components shown, interactions work, well organized

### Theme Customization Page
- **Functionality**: Color palette selection, logo upload, and theme preview
- **Purpose**: Allows users to customize app appearance and branding
- **Trigger**: Navigation to theme page
- **Progression**: User opens theme page → Color pickers available → User selects colors → Changes apply instantly → Logo upload works → Settings persist
- **Success criteria**: Colors update across app, logo displays, settings save

### Dark/Light Mode Toggle
- **Functionality**: Global theme mode switcher in header
- **Purpose**: Provides accessibility and user preference accommodation
- **Trigger**: User clicks mode toggle in header
- **Progression**: User clicks toggle → Mode switches instantly → All components update → Preference saves → Icon updates
- **Success criteria**: Mode switches work, persistence across sessions, all components adapt

## Edge Case Handling

- **Empty Data States**: Graceful handling when tables or charts have no data to display
- **Image Loading Failures**: Fallback placeholders for broken or missing images  
- **Theme Conflicts**: Validation to ensure color combinations meet accessibility standards
- **Mobile Navigation**: Collapsible menu for smaller screens with touch-friendly targets
- **Large Datasets**: Performance optimization for tables with many rows
- **Invalid File Uploads**: Error handling for unsupported logo file types

## Design Direction

The design should feel modern, professional, and component-focused with a clean interface that lets the components and data shine. Minimal approach with purposeful use of space and clear visual hierarchy.

## Color Selection

Custom palette approach with carefully selected colors for professional application use.

- **Primary Color**: Deep blue `oklch(0.4 0.15 250)` - Conveys trust and professionalism for main actions
- **Secondary Colors**: Light gray `oklch(0.95 0.01 250)` for backgrounds, medium gray `oklch(0.6 0.02 250)` for borders  
- **Accent Color**: Vibrant teal `oklch(0.6 0.15 180)` - Attention-grabbing highlight for interactive elements and success states
- **Foreground/Background Pairings**: 
  - Background (White `oklch(1 0 0)`): Dark gray text `oklch(0.2 0.02 250)` - Ratio 12.6:1 ✓
  - Card (Light gray `oklch(0.98 0.01 250)`): Dark gray text `oklch(0.2 0.02 250)` - Ratio 11.8:1 ✓
  - Primary (Deep blue `oklch(0.4 0.15 250)`): White text `oklch(1 0 0)` - Ratio 8.9:1 ✓
  - Accent (Vibrant teal `oklch(0.6 0.15 180)`): White text `oklch(1 0 0)` - Ratio 4.7:1 ✓

## Font Selection

Clean, modern sans-serif typography that emphasizes readability and professionalism using Inter for its excellent screen rendering and comprehensive character set.

- **Typographic Hierarchy**: 
  - H1 (Page Titles): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing  
  - H3 (Component Titles): Inter Medium/20px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height
  - Captions: Inter Regular/14px/normal spacing

## Animations

Subtle, purposeful animations that enhance usability without distraction, focusing on smooth transitions and clear feedback for user interactions.

- **Purposeful Meaning**: Gentle transitions communicate state changes and guide user attention to important actions
- **Hierarchy of Movement**: Navigation transitions are most prominent, followed by component state changes, with micro-interactions being most subtle

## Component Selection

- **Components**: Header (Navigation), Footer, DataTable (shadcn Table), InfoCard (shadcn Card), LineChart (Recharts), GanttChart (custom), ThemePicker (shadcn Select + color inputs), ComponentShowcase, ModeToggle (shadcn Switch)
- **Customizations**: Custom Gantt chart component, enhanced theme picker with live preview, component documentation layout
- **States**: All interactive elements have hover, active, focus, and disabled states with smooth transitions
- **Icon Selection**: Phosphor icons for navigation (House, Table, CreditCard, ChartLine, Calendar, Palette, Moon/Sun)
- **Spacing**: Consistent 4px base unit using Tailwind's spacing scale (p-4, m-6, gap-8 etc.)
- **Mobile**: Header collapses to hamburger menu, tables become horizontally scrollable, cards stack vertically, responsive grid layouts throughout