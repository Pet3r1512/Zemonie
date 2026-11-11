const release_official = [
  {
    version: "v1.2.0",
    date: "Nov 11, 2026",
    tag: "Official",
    changes: [
      {
        type: "update",
        text: "Brand-new look across the app: a fresh, easier-to-read design with clearer colors, spacing, and layouts on every page. 🚀",
      },
      {
        type: "update",
        text: "Refreshed the landing page with updated content and a new design.",
      },
      {
        type: "feature",
        text: "Dates and times now show in your own local time zone, so your transactions, budgets, charts, and insights line up with your day.",
      },
      {
        type: "feature",
        text: "Added a cookie consent pop-up so you can choose your privacy preferences, and we will remember them for your next visit.",
      },
      {
        type: "update",
        text: "Transaction dates and times are now shown in a consistent format across all transaction pages.",
      },
      {
        type: "update",
        text: "The Last 7 Days Spending chart is simpler to read, and days with no spending now clearly show zero.",
      },
      {
        type: "fix",
        text: "Fixed chart tooltips so large amounts and their transaction types no longer appear cramped.",
      },
      {
        type: "fix",
        text: "Fixed the amount field in the budget form so it looks consistent with the rest of the form.",
      },
      {
        type: "fix",
        text: "Fixed the dashboard jumping around on mobile browsers. The header now stays in place while the content scrolls smoothly below it.",
      },
      {
        type: "fix",
        text: "Fixed the size of the icon in the budget amount field.",
      },
    ],
  },
  {
    version: "v1.1.6",
    date: "Nov 01, 2026",
    tag: "Official",
    changes: [
      {
        type: "update",
        text: "Improved consistency across the app with more unified page layouts and visual styles.",
      },
      {
        type: "update",
        text: "Strengthened app reliability through expanded testing to help prevent issues and ensure features work as expected.",
      },
      {
        type: "update",
        text: "Improved the sign-up experience and overall account setup reliability.",
      },
      {
        type: "update",
        text: "Improved the stability and maintainability of the app to support future improvements.",
      },
    ],
  },
  {
    version: "v1.1.5",
    date: "Oct 22, 2026",
    tag: "Official",
    changes: [
      {
        type: "fix",
        text: "Fixed an issue that could cause the daily net amount to be calculated incorrectly.",
      },
      {
        type: "update",
        text: "Improved the reliability and stability of Zemonie with additional testing and quality improvements behind the scenes.",
      },
      {
        type: "update",
        text: "Expanded our documentation to make Zemonie easier to understand, contribute to, and maintain.",
      },
    ],
  },
  {
    version: "v1.1.4",
    date: "Oct 12, 2026",
    tag: "Official",
    changes: [
      {
        type: "feature",
        text: "Added a daily summary to the Transactions page, showing your net balance for each day based on your income and expenses. 🚀",
      },
      {
        type: "update",
        text: "Continued improving performance and reliability behind the scenes to keep Zemonie fast, stable, and reliable.",
      },
    ],
  },
  {
    version: "v1.1.3",
    date: "Oct 04, 2026",
    tag: "Official",
    changes: [
      {
        type: "feature",
        text: "Only sends a transaction update request when the transaction data has actually changed.",
      },
      {
        type: "fix",
        text: "Fixed missing colors in charts.",
      },
      {
        type: "fix",
        text: "Fixed the email verification dialog and profile page layout on mobile devices.",
      },
      {
        type: "fix",
        text: "Fixed an issue that prevented users from changing the category when updating a transaction.",
      },
    ],
  },
  {
    version: "v1.1.2",
    date: "Sep 29, 2026",
    tag: "Official",
    changes: [
      {
        type: "update",
        text: "Restructured the new transaction form by moving the amount field to the top and making it more prominent, while removing the unnecessary “Cancel” button for a simpler experience.",
      },
      {
        type: "update",
        text: "Reduced the width of transaction and budget detail popups on larger screens, such as laptops, for a cleaner layout.",
      },
    ],
  },
  {
    version: "v1.1.1",
    date: "Sep 24, 2026",
    tag: "Official",
    changes: [
      {
        type: "feature",
        text: "Added a single button for creating new transactions, making it easier to add income or expenses. 🚀",
      },
      {
        type: "feature",
        text: "Added the ability to edit existing budgets.",
      },
      {
        type: "feature",
        text: "Settings now remembers your most recently visited tab for easier navigation.",
      },
      {
        type: "update",
        text: "Improved sidebar navigation on mobile and tablet devices by keeping the menu trigger easily accessible.",
      },
      {
        type: "update",
        text: "Increased the size of transaction and budget detail popups on tablets for better readability.",
      },
      {
        type: "fix",
        text: "Fixed an issue where budgets were not automatically updated after adding a transaction.",
      },
    ],
  },
  {
    version: "v1.1.0",
    date: "Sep 07, 2026",
    tag: "Official",
    changes: [
      {
        type: "feature",
        text: "Added a forgot/reset password flow — request a reset link from the sign-in page and set a new password with a secure email link. 🚀",
      },
      {
        type: "feature",
        text: "Added email verification with a status badge, and the option to verify your email from your profile.",
      },
      {
        type: "feature",
        text: "Added a security section in Settings where you can update your password.",
      },
      {
        type: "update",
        text: "Welcome emails are now branded and sent to every new account after sign-up.",
      },
    ],
  },
];

export default release_official;
