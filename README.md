# 🌤️ QOTD – Quote of the Day App

A minimalist and stylish mobile app built with **React Native** and **Expo**, designed to inspire users with a new quote every day. QOTD displays a **“Quote of the Day”** on the home screen, allows browsing **random quotes**, and lets users **save their favorites** locally.

---
A minimalist and stylish mobile app built with React Native and Expo, designed to inspire users with a new quote every day. QOTD displays a “Quote of the Day” on the home screen, allows browsing random quotes, and lets users **save their favorites locally.
## ✨ Features

### 🧭 Three-Tab Navigation
QOTD uses **Expo Router** for native tab-based navigation with three main screens:

- **🏠 Home** – Displays the “Quote of the Day” fetched from the API.
- **💖 Favorites** – Lists all quotes that the user has saved locally.
- **🎲 Random** – Fetches and displays a new random quote each time the screen is opened or a button is tapped.

### 💬 Quote API Integration
Quotes are fetched using the [**API Ninjas Quote API**](https://api-ninjas.com/api/quotes).  
Both daily and random quotes are retrieved securely via your personal API key (see setup instructions below).

### 💾 Local Storage
Favorite quotes are stored using **@react-native-async-storage/async-storage**, ensuring persistence across app launches.  
Users can toggle favorites by tapping a **heart icon**.

### 🎨 Dynamic Gradient Cards
Each quote is displayed on a card with a **randomized grayscale gradient** background, generated using **expo-linear-gradient** for a fresh, elegant look every time.

### 🔤 Custom Font
The app uses the **Plaster_400Regular** font, loaded dynamically via **expo-font** and **@expo-google-fonts/plaster**, giving QOTD a unique and artistic touch.

---

## 🧱 Technology Stack

| Category | Technologies |
|-----------|---------------|
| Framework | React Native (Expo) |
| Language | TypeScript |
| Navigation | Expo Router |
| UI Effects | expo-linear-gradient |
| Storage | @react-native-async-storage/async-storage |
| Fonts | expo-font, @expo-google-fonts/plaster |

---

## 📂 Project Structure

```bash
QOTD/
├── app/
│   ├── _layout.tsx                # Root layout (loads custom font)
│   ├── (tabs)/
│   │   ├── _layout.tsx            # Configures main tab navigator
│   │   ├── home.tsx               # Home screen (Quote of the Day)
│   │   ├── fav.tsx                # Favorites screen
│   │   └── random.tsx             # Random quote screen
├── components/
│   ├── header.tsx                 # App header displaying "QOTD"
│   └── qouteapi.tsx               # Handles quote fetching, gradient generation, and favorite toggling
├── .env                           # Environment file (API key)
├── .gitignore                     # Git ignored files
└── package.json




⚙️ Getting Started
Follow these steps to set up and run the QOTD - Quote of the Day App locally on your device.

1️⃣ Clone the Repository
git clone https://github.com/yourusername/QOTD.git
cd QOTD


2️⃣ Install Dependencies

Use npm or yarn to install all required packages:
npm install

or

yarn install


3️⃣ Get Your Free API Key

Go to the API Ninjas Quote API
 website and sign up for a free API key.
You’ll use this key to fetch daily and random quotes from the API.


4️⃣ Create a .env File
In the root directory of your project, create a new file named .env and add your API key like this:
EXPO_PUBLIC_API_KEY=YOUR_API_KEY_HERE


⚠️ Important: Never share or commit your .env file to GitHub.
5️⃣ Add .env to .gitignore
Open (or create) your .gitignore file in the root of your project and make sure it contains:
.env


This ensures your API key stays private.


6️⃣ Update the API Key Reference

Open the file:
components/qouteapi.tsx
Replace any hard-coded API key with:
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
This tells your app to securely use the key stored in your .env file.


7️⃣ Run the App

Start the Expo development server:
npx expo start
Once started, you can:
Press i to launch the iOS simulator (on macOS)
Press a to launch the Android emulator
Or scan the QR code with the Expo Go app on your physical device


🎉 You’re all set!
Your QOTD app should now be running locally, fetching live quotes and saving your favorites.

🖼️ Screenshots
Home   	Favorites	Random Quote
