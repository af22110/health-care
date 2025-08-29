# **App Name**: Guardian Angel

## Core Features:

- Data Ingestion: Accept sensor data from Raspberry Pi in JSON format and store it in Firestore.
- Data Analysis: Use Gemini API (simulated with a tool) to analyze sensor data for anomalies.
- Anomaly Detection: Detect anomalies in real-time using a rule based system which will be incorporated by the Gemini API tool.
- User Notifications: Send notifications to users (via mobile app) and doctors (via web dashboard) upon anomaly detection using Firebase Cloud Messaging.
- Sensor Data Visualization: Allow the user to visualize and inspect trends of their own historical sensor data via charts and graphs.
- Secure Access: Implement Firebase Authentication with role-based access control (users and doctors). Users can only access their data and doctors can view all data. Role-based access is governed via security rules

## Style Guidelines:

- Primary color: Soft blue (#64B5F6) to convey calmness and trust.
- Background color: Light gray (#F0F4F7) for a clean, modern look.
- Accent color: Orange (#FFB74D) for alerts and important actions.
- Body and headline font: 'PT Sans' for a modern but warm and welcoming look
- Use clear, intuitive icons for sensor data and notifications.
- Clean and simple layout with clear hierarchy for easy navigation.
- Subtle animations for data updates and notifications.