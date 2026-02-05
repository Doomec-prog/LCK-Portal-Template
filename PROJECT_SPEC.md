# Filmmakers League Portal — Project Specification

## 1. Project Overview
This project is a high-fidelity, premium frontend prototype for a **Filmmakers Union (League)** portal. It consists of two main user flows:
1.  **Application Wizard:** A step-by-step onboarding process for new members.
2.  **Member Dashboard:** A cinematic, bento-grid style dashboard for active members.

**Key Aesthetic:** Cinematic, Premium, Dark Mode, Gold Accents, Glassmorphism.

## 2. Tech Stack & Environment
*   **Framework:** React 18 (Vite).
*   **Styling:** Tailwind CSS (via CDN script injection for quick prototyping).
*   **Icons:** Lucide React.
*   **Build Tool:** Vite (Handles TSX -> JS compilation).
*   **Language:** TypeScript (TSX).

## 3. Design System & Theming
The design relies heavily on a custom `tailwind.config` injected in `index.html`.

### Color Palette
*   **Backgrounds:** Deep Slates (`#0f172a`, `#050B14`, `#0B1221`).
*   **Gold (Brand):** Used for borders, glows, and active states.
    *   `gold-400` (#fbbf24) to `gold-600` (#d97706).
    *   **Glow Effects:** `shadow-[0_0_20px_rgba(251,191,36,0.4)]`.
*   **Text:** White/Slate-200 for body, Gold gradients for headers.

### Visual Components
*   **Glassmorphism:** Heavy use of `backdrop-blur`, `bg-slate-900/80`, and `border-white/10` or `border-gold-500/30`.
*   **Animations:** Smooth transitions on hover, entrance animations (`animate-fadeIn`), pulse effects on status indicators.
*   **Typography:** 'Inter' font family.

## 4. Component Architecture

### `App.tsx` (Root)
*   Manages Global State:
    *   `view`: 'wizard' | 'dashboard'
    *   `lang`: 'en' | 'ru'
    *   `userData`: Stores applicant data after wizard completion.
*   Renders the floating **Language Toggle** (EN/RU).

### `components/Wizard/WizardFlow.tsx`
A 4-step linear process.
*   **State:** Local `formData` mirroring `UserData` interface.
*   **Transitions:** Wrapped in `WizardTransitionProvider`. Uses `<Clapperboard />` to obscure the screen during step changes for a cinematic effect.
*   **UI Elements:**
    *   **Premium Stepper:** Custom horizontal progress bar with glowing gold circles.
    *   **Steps:**
        1.  **Personal:** Basic inputs.
        2.  **Professional:** Role, Education, IMDb.
        3.  **Documents:** Includes a Requirements List, simulation of template download, and Drag & Drop zone.
        4.  **Review:** Read-only summary of data.

### `components/Wizard/Clapperboard.tsx`
*   An animated overlay component.
*   **Behavior:** Appears when `goToStep` is called. "Claps" after ~800ms. Triggers the actual state change while the screen is covered, then fades out.
*   **Context:** Consumes `WizardTransitionContext`.

### `components/Dashboard/DashboardLayout.tsx`
A comprehensive dashboard view using a **Bento Grid** layout.
*   **Layout:**
    *   **Sidebar (Rail):** Fixed left navigation. Thin, premium look. Icons only on desktop.
    *   **Header:** Welcome message, Notifications, User info.
    *   **Grid Content:**
        *   **Hero Widget (Member Card):** Large 2-col widget. Displays Avatar, ID, Status (Active), Valid Through progress bar, QR code.
        *   **Small Widgets:** Profile, Dues, Networking, Legal, Events.
*   **Tab System:** Switches content between 'Overview', 'Resources', 'Dues', 'Profile'.

### `translations.ts`
Contains all static text strings for EN and RU.
*   Structure: `translations[lang].scope.key`.
*   Scopes: `wizard` and `dashboard`.

## 5. Data Models (`types.ts`)

```typescript
export interface UserData {
  fullName: string;
  city: string;
  email: string;
  phone: string;
  role: string;
  education: string;
  imdbLink: string;
  documents: File[];
}

export type AppView = 'wizard' | 'dashboard';
export type Language = 'ru' | 'en';
```

## 6. Implementation Notes for AI
1.  **Modifying UI:** When changing UI, ensure you maintain the `gold-500` glow effects and dark backgrounds. Do not revert to standard light mode or simple colors.
2.  **Adding Features:** Always add text to `translations.ts` first, then reference it in components.
3.  **Files:**
    *   `components/UI.tsx` contains reusable primitives (`Button`, `Input`, `Card`) that adhere to the design system. Use them instead of raw HTML elements.
4.  **Responsiveness:** The Dashboard uses CSS Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Ensure new widgets fit this structure.

## 7. Current Content Requirements (Wizard Step 3)
The "Documents" step must display this specific list:
*   Application form (signed)
*   Copy of ID
*   Copy of Diploma OR >1 year experience proof
*   Criminal record certificate
*   Narcological dispensary certificate
*   Psychiatric dispensary certificate
*   Resume (CV)

## 8. User Flow
1.  User starts at **Wizard**.
2.  User fills data -> "Next".
3.  **Clapperboard Effect:** Screen is covered, clap occurs, step changes in background, screen reveals new step.
4.  Completion -> Simulated loading screen.
5.  Redirect to **Dashboard**.

## 9. Deployment Guide (Vercel)
This project is configured as a **Vite** application.

1.  **Push to GitHub:** Commit and push all files (including `package.json`, `vite.config.ts`, `tsconfig.json`).
2.  **Vercel Dashboard:**
    *   Import the repository.
    *   **Framework Preset:** Vercel should auto-detect **Vite**. If not, select it manually.
    *   **Build Command:** `vite build` (or `npm run build`) - Auto-detected.
    *   **Output Directory:** `dist` - Auto-detected.
3.  **Deploy.**