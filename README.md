# ShoreSquad 🌊

> Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

ShoreSquad is a modern web application designed to mobilize young people for beach cleanup activities using interactive maps, weather tracking, and social features.

## ✨ Features

- **🗺️ Interactive Maps** - Find beach cleanup events near you with real-time mapping
- **🌤️ Weather Tracking** - Check weather conditions to plan the perfect cleanup day
- **👥 Squad Building** - Connect with like-minded eco-warriors and build your cleanup crew
- **📱 Mobile First** - Optimized for mobile use - organize cleanups on the go
- **⚡ Performance Optimized** - Fast loading with modern web technologies
- **♿ Accessible** - WCAG 2.1 AA compliant for inclusive design

## 🎨 Design System

### Color Palette
- **Primary**: #2E86AB (Ocean Blue)
- **Secondary**: #F6F1D1 (Sandy Beige)
- **Accent**: #F24236 (Coral Pink)
- **Supporting**: #83A598 (Sea Foam Green)
- **Dark**: #1B263B (Deep Navy)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code with Live Server extension (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoresquad
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Start Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or use the "Go Live" button in VS Code status bar

4. **View the application**
   - Open your browser to `http://localhost:3000`
   - The app will automatically reload when you make changes

## 📁 Project Structure

```
shoresquad/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Stylesheet with design system
├── js/
│   └── app.js             # Main JavaScript application
├── .vscode/
│   └── settings.json      # VS Code Live Server configuration
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot instructions
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🛠️ Development

### Key Technologies
- **HTML5** - Semantic markup with accessibility in mind
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** - ES6+ features, modern APIs
- **Leaflet.js** - Interactive maps
- **Progressive Web App** - Service worker ready

### Performance Features
- Lazy loading for images and content
- Intersection Observer for scroll animations
- Debounced resize and throttled scroll handlers
- Optimized asset loading

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- High contrast color ratios
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences

## 🌍 API Integration

### Weather API
The application is set up to integrate with weather APIs. To add real weather data:

1. Get an API key from a weather service (e.g., OpenWeatherMap)
2. Replace the mock data in `js/app.js`
3. Add your API key to environment variables

### Maps
Currently using OpenStreetMap tiles via Leaflet.js. No API key required for basic usage.

## 📱 PWA Features

The application is ready for Progressive Web App functionality:
- Service worker registration in place
- Responsive design for all devices
- Offline-ready architecture (when service worker is implemented)

## 🤝 Contributing

We welcome contributions to make ShoreSquad even better! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow the code style** guidelines in `.github/copilot-instructions.md`
4. **Test your changes** across different devices and browsers
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Style
- Use the established color palette and design system
- Follow accessibility best practices
- Ensure mobile responsiveness
- Add meaningful comments for complex functionality
- Use semantic HTML and meaningful class names

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Responsive design
- [x] Interactive maps
- [x] Weather widget
- [x] Event listing
- [x] Navigation system

### Phase 2: Community Features (Planned)
- [ ] User authentication
- [ ] Event creation and management
- [ ] Real-time chat
- [ ] Social sharing
- [ ] Photo uploads

### Phase 3: Advanced Features (Future)
- [ ] Push notifications
- [ ] Offline functionality
- [ ] Gamification
- [ ] Impact tracking
- [ ] Partner integrations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenStreetMap** - For providing free map tiles
- **Leaflet** - For the excellent mapping library
- **Google Fonts** - For the Poppins font family
- **The beach cleanup community** - For inspiring this project

## 📞 Support

If you have questions or need help:
- Create an issue on GitHub
- Check the documentation
- Reach out to the community

---

**Made with 💙 for cleaner shores and stronger communities**

*ShoreSquad - Making waves for a cleaner planet* 🌊
