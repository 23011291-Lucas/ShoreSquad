<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# ShoreSquad - Beach Cleanup Community Platform

## Project Overview
ShoreSquad is a modern web application designed to mobilize young people for beach cleanup activities using interactive maps, weather tracking, and social features.

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain accessibility standards (ARIA labels, alt text, proper heading hierarchy)
- Follow mobile-first responsive design principles
- Use meaningful class names that reflect the brand (shore, squad, beach, cleanup themes)

### CSS
- Follow the established design system with CSS custom properties (variables)
- Use the defined color palette:
  - Primary: #2E86AB (Ocean Blue)
  - Secondary: #F6F1D1 (Sandy Beige) 
  - Accent: #F24236 (Coral Pink)
  - Supporting: #83A598 (Sea Foam Green)
  - Dark: #1B263B (Deep Navy)
- Maintain consistent spacing using the spacing scale
- Implement smooth transitions and animations
- Ensure high contrast ratios for accessibility
- Use Flexbox and CSS Grid for layouts
- Follow BEM-like naming conventions

### JavaScript
- Use modern ES6+ features
- Implement error handling for all async operations
- Follow the established class-based architecture
- Use performance optimizations (throttling, debouncing, lazy loading)
- Implement progressive enhancement
- Add proper accessibility event handling
- Use meaningful variable and function names related to beach cleanup and community themes

### Performance
- Optimize images and assets
- Implement lazy loading
- Use intersection observers for scroll effects
- Minimize bundle sizes
- Add service worker for PWA functionality

### Features to Implement
- Interactive maps with Leaflet.js
- Weather API integration
- Real-time event updates
- Social sharing capabilities
- Mobile-responsive design
- Accessibility compliance (WCAG 2.1 AA)
- Progressive Web App features

### Brand Tone
- Friendly and energetic (appeal to young audience)
- Environmental and community-focused
- Use ocean and beach-related terminology
- Emphasize collaboration and fun while being eco-conscious

### API Integration Guidelines
- Use environment variables for API keys
- Implement proper error handling and fallbacks
- Add loading states for all API calls
- Cache responses when appropriate
- Follow rate limiting best practices

When suggesting code changes or new features, prioritize:
1. User experience and accessibility
2. Performance optimization
3. Mobile responsiveness
4. Brand consistency
5. Environmental impact awareness
6. Community building features
