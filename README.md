# Stake Project

This is a mobile application built with the **Ionic framework** and **Angular**, designed to provide a comprehensive platform for managing and exploring financial instruments. It features a modern, clean interface with a clear project structure, making it easy to develop and maintain.

## Repository

- **StackBlitz** https://stackblitz.com/~/github.com/ozlongblack/miniature-pancake
- **GitHub:** https://github.com/ozlongblack/miniature-pancake

---

## Project Structure

This project follows a standard Ionic and Angular file structure, organized to promote clarity and separation of concerns.

```
root/
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── karma.conf.js
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .browserslistrc
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── README.md
├── src/
│   ├── main.ts
│   ├── polyfills.ts
│   ├── test.ts
│   ├── global.scss
│   ├── index.html
│   ├── zone-flags.ts
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.routes.ts
│   │   ├── tabs/
│   │   │   ├── tabs.page.ts
│   │   │   ├── tabs.page.html
│   │   │   ├── tabs.routes.ts
│   │   ├── pages/
│   │   │   ├── invest/
│   │   │   │   ├── invest.page.ts
│   │   │   │   ├── invest.page.html
│   │   │   │   ├── invest.page.scss
│   │   │   ├── discover/
│   │   │   │   ├── discover.page.ts
│   │   │   │   ├── discover.page.html
│   │   │   │   ├── discover.page.scss
│   │   ├── components/
│   │   │   ├── card/
│   │   │   ├── instrument/
│   │   │   ├── modal/
│   │   │   ├── swipe-button/
│   │   │   ├── type/
│   │   ├── services/
│   │   ├── interfaces/
│   ├── assets/
│   │   ├── data/
│   │   │   ├── details.json
│   │   │   ├── pricing.json
│   │   ├── icons/
│   │   ├── fonts/
│   ├── environments/
│   │   ├── environment.ts
│   │   ├── environment.prod.ts
│   ├── styles/
│   ├── theme/
│   │   ├── variables.scss

```

## Main Folders and Files

- **Configuration Files** `angular.json`, `tsconfig.json`, `package.json`, etc.  
  These are the core configuration files that define the project's build process, TypeScript settings, and dependencies.

- **`src/`** This directory contains all the application's source code.
  - `app/`: The heart of the application, containing all components, pages, services, and routing.
    - `tabs/`: Manages the tab-based navigation, a key feature for mobile apps.
    - `pages/`: Houses the main pages or views of the application, such as the `Invest` and `Discover` screens.
    - `components/`: A library of reusable UI components, promoting a DRY (Don't Repeat Yourself) approach.
    - `services/`: Contains services for handling business logic, API calls, and state management.
    - `interfaces/`: Stores TypeScript interfaces for type definitions, ensuring data consistency and code reliability.
  - `assets/`: A repository for static resources like icons, fonts, and local data files.
    - `data/details.json`: A static mock data file containing detailed information about financial instruments.
    - `data/pricing.json`: A static mock data file for pricing information.
  - `theme/`: Holds theme-related styles, including the `variables.scss` file for global style variables.

---

## Features Overview

This application is built around two primary user flows, supported by a robust set of reusable components and services.

### **Invest Page**

Tapping an item on the `Trending Stocks` list triggers a simplified purchase flow. This action adds a stock symbol and shares to the user's portfolio object. Due to incomplete form implementation, a fixed equity of $500 is always added, and all data is currently non-persistent and will be lost upon page refresh.

<img width="300" height="649" alt="image" src="https://github.com/user-attachments/assets/e36da2f5-ac87-4806-b54b-712a6679a872" />
<img width="300" height="649" alt="image" src="https://github.com/user-attachments/assets/4f8d961a-5d95-4675-8e4f-a5a5eba38645" />
<img width="300" height="649" alt="image" src="https://github.com/user-attachments/assets/7d486545-ce66-49a9-ab83-d9cdf28752cb" />

### **Discover Page**

The search bar on this page implements a **500ms debounce** to optimize performance. When a user types, the application waits for a brief pause before filtering the stock list. The results are filtered to show only those instruments where the `symbol` begins with the search query, providing a responsive and relevant search experience.

<img width="300" height="649" alt="image" src="https://github.com/user-attachments/assets/956b3476-d0e5-4846-a3d6-b0de9cf8211f" />
<img width="300" height="649" alt="image" src="https://github.com/user-attachments/assets/0c5978e1-a244-4ad3-af65-c28d487f2e6b" />

### **Components**

The application is built using a modular component-based architecture. To ensure high reusability and scalability, components are designed to be purely presentational, without embedded business logic. They receive data through **`@Input()`** decorators and communicate events back to their parent components using **`@Output()`** decorators.

- **Cards:** A single card component can render in three distinct UIs (small, medium, large) by accepting an **`Enum` type** as an input, providing layout flexibility without needing multiple components.
- **Instrument Displays:** Standardized components for presenting financial instrument data.
- **Modals:** Although a bottom sheet-style modal was intended to appear from the bottom of the screen.
- **Swipe Buttons:** A unique UI element for user actions, enhancing the mobile experience.

### **Services**

The application's business logic is separated into dedicated services. These services are responsible for:

- **Data Retrieval:** For scenarios where multiple dynamic data sources need to be combined (e.g., merging static instrument details with live pricing data), the `combineLatest` RxJS operator is used. This allows the application to react to changes in any of the data streams.
- **State Management:** **`BehaviorSubject`** is used to implement a multicast stream, allowing multiple components to subscribe to and receive the current state and any subsequent updates.

### **Styling**

The project's styling is designed for consistency and adherence to the design specifications.

- **CSS Variables:** To ensure a uniform look and feel across the application, CSS variables (`--variable-name`) are used for elements like fonts and colors. This allows for centralized control and easy theme adjustments.
- **Sass Variables:** A Sass variable `$spacer` is defined with a value of `4px`. This variable is used consistently to set padding and margins in multiples of 4, ensuring a pixel-perfect layout that aligns with the Figma design.
- **Custom Fonts:** To match the design's typography, the **Universal Sans** web font has been added to the project.

---

## Assumptions

For the purpose of development and demonstration, the project operates under the following key assumptions:

- **Authentication:** It is assumed that the **user is already logged in**. The application does not include login or registration flows.
- **API Data Handling:** The application's services are designed to **fetch the entire list of data from the API in a single call**, rather than implementing pagination or incremental loading.
- **User Interface:** This project is designed and optimized **exclusively for mobile user interfaces**. It does not account for tablet or desktop screen sizes, and its UI components are tailored for touch-based interactions.

---

### **Limitations and Future Considerations**

This project serves as a foundational implementation with a focus on core functionality. The following aspects were intentionally simplified or omitted and should be considered for future development:

- **Dynamic UI Elements:** Dynamic user interface components, such as a **carousel** or other interactive sliders, have been omitted for simplicity.
- **Form Handling:** The **purchase process and related form handling** have been simplified. A full-featured implementation would require robust validation and state management for user input.
- **Lazy Loading:** The current data fetching strategy retrieves the entire data set in a single API call. Implementing **lazy loading** or **incremental data fetching** is necessary for optimizing performance with large datasets.
- **Styling Consistency:** Due to the nature of framework components, there may be **minor style differences** between the Ionic components and the original Figma design. These differences would need to be addressed through custom CSS overrides.
