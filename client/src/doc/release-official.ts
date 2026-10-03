const release_official = [
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
