# Booking System with Calendar

A modern, fully responsive online booking system for service-based businesses. This project features a multi-step booking form, calendar date selection, and a beautiful user interface built with Next.js, TypeScript, Tailwind CSS, and shadcn-ui.

---

## ✨ Features

- 📅 **Multi-step Booking Form**: Collects service, date, time, customer, and vehicle details
- 🗓️ **Calendar Integration**: Users can select available dates and times for appointments
- 🚗 **Vehicle & Service Selection**: Supports multiple vehicle types and services
- 📝 **Special Instructions & Issues**: Customers can add notes and specify vehicle issues
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- 💎 **Modern UI**: Built with shadcn-ui and Tailwind CSS for a clean, professional look
- 🔔 **Booking Confirmation**: Users receive a confirmation after booking

---

## 🚀 Getting Started

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the development server**
   ```sh
   npm run dev
   ```
4. **Open your browser**
   Visit `http://localhost:3000` to view the booking system.

---

## 🛠️ Technologies Used

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- shadcn-ui

---

## 📋 Booking Flow

1. **Select Service & Vehicle Type**
2. **Choose Date & Time (Calendar)**
3. **Enter Personal & Vehicle Details**
4. **Add Special Instructions or Issues (optional)**
5. **Review & Confirm Booking**
6. **Receive Confirmation**

---

## 📦 Project Structure

- `src/components/BookingForm.tsx` – Main multi-step booking form
- `src/components/ui/calendar.tsx` – Calendar component for date selection
- `src/pages/Booking.tsx` – Booking page entry point
- `src/app/booking/page.tsx` – Next.js app route for booking

---

## 🚧 Needs & Work Required

- **Backend Integration**: Store bookings in a database, send confirmation emails/SMS
- **Admin Dashboard**: Manage and view bookings
- **Promo Code Support**: Allow users to enter and validate promo codes
- **Payment Integration**: Accept online payments (Stripe, PayPal, etc.)
- **Notifications**: Email/SMS reminders and confirmations
- **Accessibility & SEO**: Improve ARIA, meta tags, and structured data
- **Testing**: Add unit and integration tests

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)