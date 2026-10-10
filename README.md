# 🛒 বাজার দর (BazarDor)

**বাজার দর** is a responsive web application that helps users explore daily product prices, compare prices across different markets, and track price changes in Bangladesh.

## 🌐 Live Demo

* **Live Website:** [[Add your Vercel deployment URL here](https://bazar-rho-eight.vercel.app/)]


## ✨ Key Features

* **Daily Price Updates:** Browse the latest available prices of essential products.
* **Market Price Comparison:** Compare minimum and maximum prices across different markets and divisions.
* **Price Trends:** Explore products with increasing and decreasing prices.
* **Category-Based Browsing:** Find products by category with sorting options.
* **Product Details:** View product information, today's price, average price, and market-wise prices.
* **Responsive Design:** Enjoy a user-friendly experience on mobile, tablet, and desktop devices.
* **Authentication:** Sign up, sign in, and manage your account using Better Auth.
* **Interactive UI:** Navigate through products and categories with a clean interface.
* **Loading and Error States:** Helpful feedback when data is loading or unavailable.

## 🛠️ Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* daisyUI
* Better Auth
* REST API
* Git and GitHub
* Vercel

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd bazar
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure your environment variables in a `.env.local` file.

   Add the required authentication credentials and environment variables according to your project configuration.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser.

## 📁 Project Structure

```text
bazar/
├── public/
├── src/
│   ├── app/
│   │   ├── category/
│   │   ├── products/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   └── type/
├── .env.example
├── package.json
└── README.md
```

*Note: The folder structure above is illustrative. Update it to match your actual project.*

## 🔐 Environment Variables

Some features may require environment variables for authentication and API configuration.

Create a `.env.local` file in the project root and add the variables required by your application.

**Important:** Never commit real API secrets, database credentials, or authentication keys to GitHub.

## 📦 Build for Production

Run the following command to create an optimized production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🚀 Deployment

This project can be deployed on [Vercel](https://vercel.com/).

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.

## 🎯 Project Goal

The goal of BazarDor is to make essential product prices easier to explore and compare, helping users make more informed shopping decisions.

## 👨‍💻 Author

**Nafis Hasan Fuad**

## 📄 License

This project was created for educational and portfolio purposes.
