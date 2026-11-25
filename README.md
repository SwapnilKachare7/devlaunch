# DevLaunch 🚀

**An A/B testing project exploring how onboarding experiences affect user completion rates.**

DevLaunch is a developer learning platform prototype built to experiment with two onboarding experiences using Flagsmith feature flags and experiments.

## 🎯 Project Objective

Test whether a guided, step-by-step onboarding experience increases completion rates compared with a simple, one-page onboarding experience.

## 💡 Experiment Hypothesis

We believe that a guided, step-by-step onboarding experience will increase onboarding completion rates compared to a simple one-page onboarding experience because it helps new users understand the setup process more easily.

## 🧪 A/B Testing Configuration

| Configuration | Details |
|---|---|
| Experiment | DevLaunch Onboarding A/B Test |
| Feature flag | `devlaunch_onboarding` |
| Control | Simple onboarding |
| Treatment | Guided onboarding |
| Control allocation | 50% |
| Treatment allocation | 50% |
| Primary metric | Onboarding Completion |
| Conversion event | `onboarding_completed` |
| Rollout | 100% |

### Variations

**Control – Simple**

Users complete all onboarding fields on one page.

**Treatment – Guided**

Users complete onboarding through three individual steps:
1. Enter name.
2. Select role.
3. Select learning goal.

## 🛠️ Tech Stack

- Vue 3
- JavaScript
- Vite
- Flagsmith JavaScript SDK
- HTML and CSS
- Browser Local Storage

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd devlaunch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_FLAGSMITH_ENVIRONMENT_KEY=YOUR_FLAGSMITH_ENVIRONMENT_KEY
```

Get your environment key from your Flagsmith Development environment.

**Never commit your actual `.env` file or expose your environment key.**

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173/
```

## 📊 Experiment Results

The experiment is currently collecting data.

| Metric | Control | Treatment |
|---|---:|---:|
| Exposures | To be updated | To be updated |
| Completion rate | To be updated | To be updated |
| Win probability | Pending | Pending |

No winning variation has been declared. More observations are required before drawing a conclusion.

## 📈 Success Metric

The primary success metric is the onboarding completion rate.

The experiment aims to determine whether the guided onboarding variation improves completion compared with the simple onboarding experience.

## 🔐 Event Tracking

The application submits the following conversion event through Flagsmith:

```javascript
flagsmith.trackEvent('onboarding_completed', {
  identifier: visitorId,
});
```

Each browser visitor receives a persistent identifier stored in Local Storage.

## 👨‍💻 Author

**Swapnil Kachare**

GitHub: https://github.com/SwapnilKachare7