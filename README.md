# Registration Form Application

This is a registration form application built with the [Next.js](https://nextjs.org/) framework, using the [react-hook-form](https://react-hook-form.com/) library and styled with [Ant Design](https://ant.design/). This application demonstrates a robust user registration process, including field validations and data handling.

## Project Overview

The `RegistrationForm` component handles user inputs for fields such as username, email, password, password confirmation, date of birth, gender, and phone number. It ensures that all data entered meets specific criteria (e.g., email format, password requirements) before allowing a user to submit the form. Validation errors are displayed clearly beneath each field to guide the user towards successful form completion.

Upon submission, if all fields are correctly filled, the form data is displayed in a JSON format within a modal window, confirming the registration success. This project aims to provide a user-friendly, interactive registration experience while employing best practices in form handling and validation with `react-hook-form`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/pages/index.tsx. The page auto-updates as you edit the file.

Features
Field Validation: Extensive checks ensure that all user input meets required criteria before submission.
Interactive UI: Real-time feedback is provided as the user fills out the form, enhancing the overall user experience.
Responsive Design: Styled with Ant Design, the form is responsive and accessible across all devices.
License
This project is open source and available under the MIT License.

## Contributions are welcome! 🌻
