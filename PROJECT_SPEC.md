# Filmmakers League Portal — Project Specification

## 1. Project Overview
This project is a high-fidelity, premium frontend prototype for a **Filmmakers Union (League)** portal. It consists of two main user flows:
1.  **Application Wizard:** A step-by-step onboarding process for new members.
2.  **Member Dashboard:** A cinematic, bento-grid style dashboard for active members.

**Key Aesthetic:** Cinematic, Premium, Dark Mode, Gold Accents, Glassmorphism.

## 2. Tech Stack & Environment
*   **Framework:** React 19 (via ESM imports).
*   **Styling:** Tailwind CSS (via CDN script injection).
*   **Icons:** Lucide React.
*   **Build/Run:** Browser-based ES modules (no bundler setup required for this prototype phase).
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
*   **UI Elements:**
    *   **Premium Stepper:** Custom horizontal progress bar with glowing gold circles.
    *   **Steps:**
        1.  **Personal:** Basic inputs.
        2.  **Professional:** Role, Education, IMDb.
        3.  **Documents:**
            *   Includes a **Requirements List** (styled card with bullets).
            *   "Download Template" button simulation.
            *   Drag & Drop styled upload zone.
        4.  **Review:** Read-only summary of data.
*   **Transition:** Upon completion, shows a loading spinner (`Loader2`) then calls `onComplete`.

### `components/Dashboard/DashboardLayout.tsx`
A comprehensive dashboard view using a **Bento Grid** layout.
*   **Layout:**
    *   **Sidebar (Rail):** Fixed left navigation. Thin, premium look. Icons only on desktop.
    *   **Header:** Welcome message, Notifications, User info.
    *   **Grid Content:**
        *   **Hero Widget (Member Card):** Large 2-col widget. Displays Avatar, ID, Status (Active), Valid Through progress bar, QR code.
        *   **Small Widgets:** Profile, Dues, Networking, Legal, Events.
*   **Tab System:** Switches content between 'Overview', 'Resources', 'Dues', 'Profile'.
    *   *Currently implemented views:* 'Overview' and 'Resources'.

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
2.  User fills data -> Uploads mock file -> Reviews -> Submits.
3.  Simulated loading screen.
4.  User is redirected to **Dashboard**.
5.  Dashboard displays data entered in Wizard (Name, Role).
