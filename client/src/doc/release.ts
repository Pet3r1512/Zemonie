const releases = [
  {
    version: "v1.0.12-beta",
    date: "Jun 28, 2026",
    tag: "Beta",
    changes: [
      {
        type: "update",
        text: "Removed plaintext fallback for encrypted amount fields — all values are now always decrypted.",
      },
      {
        type: "fix",
        text: "Fixed backfill script to work correctly with Neon serverless adapter.",
      },
    ],
  },
  {
    version: "v1.0.11-beta",
    date: "Jun 28, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Improved data security by encrypting sensitive financial information, including transaction amounts and account balances.",
      },
    ],
  },
  {
    version: "v1.0.10-beta",
    date: "Jun 28, 2026",
    tag: "Beta",
    changes: [
      {
        type: "fix",
        text: "Fixed table height inconsistencies to better fit their containers",
      },
      {
        type: "fix",
        text: "Fixed an issue where the mobile sidebar could prevent users from interacting with content on the homepage.",
      },
    ],
  },
  {
    version: "v1.0.9-beta",
    date: "Jun 26, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Added automatic recurring budget updates to keep recurring budgets to next months.",
      },
      {
        type: "update",
        text: "Enhanced the homepage's hero section with a dynamic animated background.",
      },
      {
        type: "update",
        text: "Redesigned the header with a cleaner and more elegant appearance.",
      },
      {
        type: "update",
        text: "Refined text, colors, and spacing across the website for a more consistent user experience.",
      },
      {
        type: "fix",
        text: "Fixed an issue where income could appear as unavailable while transactions were still loading.",
      },
      {
        type: "fix",
        text: "Corrected spacing on the Last 7 Days Spending chart for mobile devices.",
      },
      {
        type: "fix",
        text: "Restored the missing theme toggle in the mobile sidebar.",
      },
    ],
  },
  {
    version: "v1.0.8-beta",
    date: "Jun 21, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Added expense budgeting, allowing users to set budgets per category with optional recurring settings and a full budget list view. 🚀",
      },
      {
        type: "feature",
        text: "The sign-up form now properly supports Vietnamese names.",
      },
      {
        type: "feature",
        text: "Added colored icons to categories for easier visual recognition in the category list.",
      },
      {
        type: "update",
        text: "Upgraded core server dependencies to the latest major version for improved stability and performance.",
      },
      {
        type: "update",
        text: "Improved smoothness of the transaction details popup on mobile browsers.",
      },
      {
        type: "update",
        text: "Redesigned dashboard sidebar with grouped navigation for better structure and usability.",
      },
      {
        type: "update",
        text: "Sorted expense categories by usage frequency for quicker access to commonly used items.",
      },
    ],
  },
  {
    version: "v1.0.7-beta",
    date: "Jun 16, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Added a current month net savings card for a quick overview of your financial performance. 🚀",
      },
      {
        type: "feature",
        text: "Introduced a last 7 days spending bar chart to better track short-term spending habits. 🔥",
      },
      {
        type: "feature",
        text: "Added a settings page for customizing the app theme.",
      },
      {
        type: "feature",
        text: "Introduced dark mode for a more comfortable viewing experience in low light.",
      },
      {
        type: "update",
        text: "Removed unused components to improve overall application performance.",
      },
      {
        type: "update",
        text: "Updated the “Spending by Category” tooltip to show total amounts instead of percentages for clearer insights.",
      },
      {
        type: "update",
        text: "Refined homepage content to strengthen branding and improve clarity.",
      },
      {
        type: "fix",
        text: "Fixed incorrect arrow direction between overview cards and the transactions page.",
      },
      {
        type: "fix",
        text: "Prevented the edit form from closing when users close the category list.",
      },
    ],
  },
  {
    version: "v1.0.6-beta",
    date: "Jun 08, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Added the ability to edit and update existing transactions with a dedicated form. 🚀",
      },
      {
        type: "update",
        text: "Improved overall dashboard performance for a smoother experience.",
      },
      {
        type: "update",
        text: "Enhanced avatar image quality for clearer and sharper visuals.",
      },
      {
        type: "update",
        text: "Refreshed landing page and features content and improved dashboard color styling for better visual consistency.",
      },
      {
        type: "fix",
        text: "Fixed an issue where the account setup form would incorrectly appear again after signing in.",
      },
      {
        type: "fix",
        text: "Corrected savings rate calculations when no income has been recorded yet.",
      },
      {
        type: "fix",
        text: "Fixed page reload behavior so users stay on their current page instead of being redirected to the dashboard.",
      },
    ],
  },
  {
    version: "v1.0.5-beta",
    date: "Jun 04, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Introduced a new monthly Income vs Expense chart. 🚀",
      },
      {
        type: "feature",
        text: "Supported VND currency with automatic currency formatting. 🔥",
      },
      {
        type: "feature",
        text: "Added more personalized insights to the dashboard.",
      },
      {
        type: "update",
        text: "Improved the mobile dashboard experience.",
      },
      {
        type: "update",
        text: "Enlarged the selected avatar preview during account setup.",
      },
      {
        type: "fix",
        text: "Fixed incorrect avatar display on the Profile page.",
      },
      {
        type: "fix",
        text: "Fixed profile information inconsistencies after account setup.",
      },
    ],
  },
  {
    version: "v1.0.4-beta",
    date: "Jun 03, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Introduced an animated transaction details popup for a more polished user experience. 🚀",
      },
      {
        type: "fix",
        text: "Fixed an issue where some users could be asked to complete setup again.",
      },
      {
        type: "fix",
        text: "Improved scrolling stability on the Transactions page to prevent interface shifting.",
      },
    ],
  },
  {
    version: "v1.0.3-beta",
    date: "Jun 01, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Introduced a Spending by Category chart for better insight into your spending habits. 🚀",
      },
      {
        type: "feature",
        text: "Added a scrollable category list to make selecting transaction categories easier.",
      },
      {
        type: "update",
        text: "Enhanced the Features page with clearer and more detailed feature information.",
      },
      {
        type: "update",
        text: "Improved app stability and consistency across Chrome, Safari, Firefox, and other major browsers.",
      },
      {
        type: "fix",
        text: "Corrected time-related inconsistencies to ensure data is displayed accurately.",
      },
      {
        type: "fix",
        text: "Fixed an issue that could cause a different avatar to appear than the one selected during setup.",
      },
    ],
  },
  {
    version: "v1.0.2-beta.1",
    date: "May 29, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Transaction forms now provide clear guidance when required fields are missing.",
      },
      {
        type: "feature",
        text: "Currency amounts are displayed in a cleaner and more consistent format.",
      },
      {
        type: "update",
        text: "Improved usability on mobile devices and smaller screens.",
      },
      {
        type: "update",
        text: "Enhanced security and reliability across the platform.",
      },
      {
        type: "update",
        text: "Faster data loading for a smoother experience.",
      },
      {
        type: "fix",
        text: "Fixed an issue that could allow transactions to be created without a description.",
      },
    ],
  },
  {
    version: "v1.0.2-beta",
    date: "May 27, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Improved account security for a safer experience",
      },
      {
        type: "feature",
        text: "Added personalized settings and preferences",
      },
      {
        type: "feature",
        text: "Added a privacy agreement checkbox during account setup",
      },
      {
        type: "update",
        text: "Refreshed app branding and visual design",
      },
      {
        type: "update",
        text: "Improved website visibility and performance on search engines",
      },
      {
        type: "fix",
        text: "Fixed minor interface and layout issues",
      },
    ],
  },
  {
    version: "v1.0.1-beta",
    date: "May 25, 2026",
    tag: "Beta",
    changes: [
      { type: "feature", text: "Improve user interfaces" },
      { type: "fix", text: "Authentication error handler" },
    ],
  },
  {
    version: "v1.0.0-beta",
    date: "May 25, 2026",
    tag: "Beta",
    changes: [
      { type: "feature", text: "Track income and expenses with ease" },
      {
        type: "feature",
        text: "Interactive dashboard with real-time analytics",
      },
      { type: "feature", text: "Currency supported: AUD and USD" },
      { type: "feature", text: "Category-based transaction management" },
      { type: "feature", text: "User authentication with email and password" },
      {
        type: "feature",
        text: "Responsive design — works on desktop and mobile",
      },
      { type: "feature", text: "Account setup wizard with avatar picker" },
    ],
  },
];

export default releases;
