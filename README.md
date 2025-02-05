# Angular Demo Site

## Overview
ResponsiveSiteAngular is a multi-language, fully responsive web application built using **Angular**. It includes dynamic page content translation using **ngx-translate**, a centralized language service, and reusable components. The project is designed for easy scalability and localization.

## Features
- **Multi-language support** (English, German, Spanish)
- **Dynamic content loading** for different pages

## Deployment
The project is deployed at: **https://responsive-site-angular.vercel.app/**

## Language Support
This application supports multiple languages. The translations are managed in **`assets/i18n/`**.

### **Adding a New Language**
1. Create a new JSON file in `src/assets/i18n/`, e.g., `fr.json` for French.
2. Add the translations following the structure of `en.json`.
3. Update the **LanguageSwitcherComponent** to include the new language.
