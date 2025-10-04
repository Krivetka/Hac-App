<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="disruption" class="modal-overlay" @click="$emit('close')">
        <transition name="slide-up">
          <div class="modal-content" @click.stop>
            <div v-if="!showPanicOptions">
              <!-- Детали нарушения -->
              <div class="modal-header">
                <h2>Szczegóły utrudnienia</h2>
                <button @click="$emit('close')" class="close-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div class="disruption-info">
                <div class="disruption-header">
                  <div :class="['icon-circle', disruption.type === 'train' ? 'train' : 'bus']">
                    <svg v-if="disruption.type === 'train'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="8" width="18" height="13" rx="2"></rect>
                      <path d="M3 12h18M8 21v-1m8 1v-1"></path>
                      <circle cx="8" cy="16" r="1"></circle>
                      <circle cx="16" cy="16" r="1"></circle>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17h10l3 3v-3h2V6H2v11h2v3z"></path>
                      <rect x="6" y="6" width="12" height="5"></rect>
                    </svg>
                  </div>
                  <div>
                    <p class="line-name">{{ disruption.line }}</p>
                    <p class="transport-type">{{ disruption.type === 'train' ? 'Pociąg' : 'Autobus' }}</p>
                  </div>
                </div>

                <div class="detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div>
                    <p class="detail-label">Opis</p>
                    <p class="detail-value">{{ disruption.description }}</p>
                  </div>
                </div>

                <div class="detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <p class="detail-label">Czas zgłoszenia</p>
                    <p class="detail-value">{{ disruption.startTime }}</p>
                  </div>
                </div>

                <div class="detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  <div>
                    <p class="detail-label">Poziom utrudnień</p>
                    <span :class="['severity-badge', `severity-${disruption.severity}`]">
                      {{ severityText }}
                    </span>
                  </div>
                </div>

                <div v-if="disruption.reportedBy === 'user'" class="detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div>
                    <p class="detail-label">Status weryfikacji</p>
                    <p :class="['verification-status', disruption.verified ? 'verified' : 'pending']">
                      {{ disruption.verified ? 'Potwierdzone przez system' : 'Oczekuje na weryfikację' }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="action-buttons">
                <button @click="showPanicOptions = true" class="panic-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Przycisk alarmowy
                </button>
                <button class="map-btn">Pokaż na mapie</button>
              </div>
            </div>

            <div v-else>
              <!-- Режим тревожной кнопки -->
              <div class="panic-header">
                <button @click="showPanicOptions = false" class="back-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
                <h2>Co chcesz zrobić?</h2>
              </div>
              <p class="panic-description">Utrudnienie na Twojej trasie. Wybierz jedną z opcji poniżej, aby kontynuować podróż.</p>
              <div class="panic-actions">
                <button class="panic-action-btn primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                  Wyznacz trasę alternatywną
                </button>
                <button class="panic-action-btn secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Zamów transport (np. taxi)
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Disruption } from '../data/mockData'

const props = defineProps<{
  disruption: Disruption | null
}>()

defineEmits<{
  close: []
}>()

const showPanicOptions = ref(false)

watch(() => props.disruption, () => {
  showPanicOptions.value = false
})

const severityText = computed(() => {
  const map = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
  }
  return map[props.disruption?.severity || 'low']
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  max-width: 480px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #6b7280;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #1f2937;
}

.close-btn svg {
  width: 1.5rem;
  height: 1.5rem;
}

.disruption-info {
  margin-bottom: 1.5rem;
}

.disruption-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.icon-circle {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle.train {
  background: #fee2e2;
  color: #dc2626;
}

.icon-circle.bus {
  background: #d1fae5;
  color: #059669;
}

.icon-circle svg {
  width: 1.5rem;
  height: 1.5rem;
}

.line-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.transport-type {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-item svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.25rem 0;
}

.detail-value {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.severity-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid;
}

.severity-high {
  background: #fee2e2;
  color: #991b1b;
  border-color: #fca5a5;
}

.severity-medium {
  background: #fef3c7;
  color: #92400e;
  border-color: #fcd34d;
}

.severity-low {
  background: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
}

.verification-status {
  font-size: 0.875rem;
  font-weight: 600;
}

.verification-status.verified {
  color: #059669;
}

.verification-status.pending {
  color: #d97706;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.panic-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #fed7aa;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.panic-btn:hover {
  background: #ffedd5;
}

.panic-btn:active {
  transform: scale(0.98);
}

.panic-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.map-btn {
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  color: #1f2937;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.map-btn:hover {
  background: #e5e7eb;
}

.map-btn:active {
  transform: scale(0.98);
}

.panic-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #6b7280;
  border-radius: 50%;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #f3f4f6;
}

.back-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.panic-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.panic-description {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.panic-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.panic-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.panic-action-btn svg {
  width: 1.5rem;
  height: 1.5rem;
}

.panic-action-btn.primary {
  background: #2563eb;
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.panic-action-btn.primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.panic-action-btn.secondary {
  background: #1f2937;
  color: white;
}

.panic-action-btn.secondary:hover {
  background: #111827;
  transform: translateY(-2px);
}

.panic-action-btn:active {
  transform: translateY(0) scale(0.98);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-up-leave-active {
  transition: transform 0.25s ease-in;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}
</style>

