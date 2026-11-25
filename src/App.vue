
<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  initializeFlagsmith,
  getOnboardingVariation,
  trackOnboardingCompleted,
  visitorId,
} from './services/flagsmith'

const variation = ref('simple')
const loading = ref(true)
const error = ref('')
const completed = ref(false)

const step = ref(1)
const name = ref('')
const role = ref('')
const goal = ref('')

const isGuided = computed(() => variation.value === 'guided')

onMounted(async () => {
  try {
    await initializeFlagsmith()
    variation.value = getOnboardingVariation()
  } catch (err) {
    console.error('DevLaunch initialization failed:', err)
    error.value = err.message || 'Unable to connect to Flagsmith.'
  } finally {
    loading.value = false
  }
})

function nextStep() {
  if (step.value < 3) step.value++
}

function previousStep() {
  if (step.value > 1) step.value--
}

function completeOnboarding() {
  trackOnboardingCompleted()
  completed.value = true
}
</script>

<template>
  <main class="page">
    <section class="card">
      <header>
        <p class="brand">DEV<span>LAUNCH</span></p>
        <p class="subtitle">Your developer journey starts here.</p>
      </header>

      <p v-if="loading">Connecting to Flagsmith...</p>

      <div v-else-if="error" class="message">
        {{ error }}
      </div>

      <div v-else-if="completed" class="content">
        <h1>You're ready to launch!</h1>
        <p>Welcome to DevLaunch, {{ name || 'developer' }}.</p>
        <p>Your onboarding is complete.</p>
      </div>

      <div v-else class="content">
        <p class="experiment">
          {{ isGuided ? 'GUIDED EXPERIENCE' : 'SIMPLE EXPERIENCE' }}
        </p>

        <h1>Welcome to DevLaunch</h1>
        <p class="description">
          Let's personalize your developer learning journey.
        </p>

        <template v-if="isGuided">
          <div class="progress">
            Step {{ step }} of 3
          </div>

          <div class="steps">
            <span :class="{ active: step >= 1 }">1. About you</span>
            <span :class="{ active: step >= 2 }">2. Your role</span>
            <span :class="{ active: step >= 3 }">3. Your goal</span>
          </div>

          <div v-if="step === 1">
            <label>Your name</label>
            <input v-model="name" placeholder="Enter your name" />
          </div>

          <div v-else-if="step === 2">
            <label>What describes you best?</label>
            <select v-model="role">
              <option disabled value="">Select your role</option>
              <option>Student</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
            </select>
          </div>

          <div v-else>
            <label>What's your main goal?</label>
            <select v-model="goal">
              <option disabled value="">Select your goal</option>
              <option>Get my first developer job</option>
              <option>Improve my coding skills</option>
              <option>Build projects</option>
              <option>Prepare for interviews</option>
            </select>
          </div>

          <div class="actions">
            <button v-if="step > 1" class="secondary" @click="previousStep">
              Back
            </button>

            <button v-if="step < 3" @click="nextStep">
              Continue
            </button>

            <button v-else @click="completeOnboarding">
              Complete onboarding
            </button>
          </div>
        </template>

        <template v-else>
          <label>Your name</label>
          <input v-model="name" placeholder="Enter your name" />

          <label>Your role</label>
          <select v-model="role">
            <option disabled value="">Select your role</option>
            <option>Student</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
          </select>

          <label>Your main goal</label>
          <select v-model="goal">
            <option disabled value="">Select your goal</option>
            <option>Get my first developer job</option>
            <option>Improve my coding skills</option>
            <option>Build projects</option>
            <option>Prepare for interviews</option>
          </select>

          <button @click="completeOnboarding">
            Complete onboarding
          </button>
        </template>
      </div>

      <footer>
        <span>DevLaunch A/B Experiment</span>
        <span>{{ variation }} · {{ visitorId.slice(0, 8) }}</span>
      </footer>
    </section>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #080d18;
  color: #f5f7fb;
  font-family: Inter, Arial, sans-serif;
}

.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 520px;
  padding: 36px;
  border: 1px solid #263247;
  border-radius: 18px;
  background: #111a2a;
}

.brand {
  font-weight: 800;
  letter-spacing: 3px;
}

.brand span {
  color: #00e69a;
}

.subtitle,
.description {
  color: #a5b1c4;
}

.content {
  margin-top: 36px;
}

.experiment {
  color: #00e69a;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
}

h1 {
  font-size: 28px;
}

label {
  display: block;
  margin: 20px 0 8px;
  color: #cbd5e1;
}

input,
select {
  width: 100%;
  padding: 13px;
  color: white;
  background: #0b1220;
  border: 1px solid #344258;
  border-radius: 8px;
}

button {
  padding: 13px 18px;
  margin-top: 24px;
  color: #07130f;
  background: #00e69a;
  border: 0;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.secondary {
  color: white;
  background: #344258;
  margin-right: 10px;
}

.progress {
  margin: 22px 0 12px;
  color: #00e69a;
}

.steps {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 24px;
  color: #7f8da3;
  font-size: 12px;
}

.steps .active {
  color: #00e69a;
}

.actions {
  display: flex;
  align-items: center;
}

footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 36px;
  color: #8290a5;
  font-size: 11px;
}

.message {
  color: #ff7777;
}
</style>
