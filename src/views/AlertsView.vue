<template>
  <div class="alerts-view">
    <header class="alerts-header">
      <h1>Powiadomienia o utrudnieniach</h1>
      <div class="filter-buttons">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
    </header>

    <div class="alerts-content">
      <!-- Прогнозируемые нарушения -->
      <div v-if="predictions.length > 0" class="predictions-section">
        <div class="prediction-card">
          <div class="prediction-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <h2>Prognozowane utrudnienia</h2>
          </div>
          <div v-for="prediction in predictions" :key="prediction.id" class="prediction-item">
            <p>{{ prediction.description }}</p>
          </div>
        </div>
      </div>

      <!-- Список активных нарушений -->
      <div v-if="filteredDisruptions.length > 0" class="disruptions-list">
        <div 
          v-for="disruption in filteredDisruptions" 
          :key="disruption.id"
          class="disruption-card"
          @click="selectDisruption(disruption)"
        >
          <div class="disruption-main">
            <div :class="['icon-wrapper', disruption.type]">
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
            <div class="disruption-info">
              <div class="disruption-header-row">
                <span class="line-number">{{ disruption.line }}</span>
                <span :class="['severity-badge', `severity-${disruption.severity}`]">
                  {{ getSeverityText(disruption.severity) }}
                </span>
              </div>
              <p class="disruption-description">{{ disruption.description }}</p>
              <div class="disruption-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Zgłoszono o {{ disruption.startTime }}</span>
                </div>
                <div v-if="disruption.reportedBy === 'user'" class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span :class="disruption.verified ? 'text-green' : 'text-yellow'">
                    {{ disruption.verified ? 'Zweryfikowane' : 'Oczekuje' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Пустое состояние -->
      <div v-else-if="!predictions.length" class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>Brak aktywnych utrudnień</h3>
        <p>Nie ma żadnych zgłoszeń w wybranej kategorii.</p>
      </div>
    </div>

    <!-- Детали нарушения -->
    <DisruptionDetails 
      :disruption="selectedDisruption" 
      @close="selectedDisruption = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockDisruptions, type Disruption } from '../data/mockData'
import DisruptionDetails from '../components/DisruptionDetails.vue'

const activeFilter = ref<'all' | 'user' | 'system'>('all')
const selectedDisruption = ref<Disruption | null>(null)

const filters = [
  { label: 'Wszystkie', value: 'all' },
  { label: 'Od użytkowników', value: 'user' },
  { label: 'Systemowe', value: 'system' }
]

const filteredDisruptions = computed(() => {
  return mockDisruptions.filter(d => {
    if (d.status === 'prediction') return false
    if (activeFilter.value === 'all') return true
    return d.reportedBy === activeFilter.value
  })
})

const predictions = computed(() => {
  return mockDisruptions.filter(d => d.status === 'prediction')
})

const getSeverityText = (severity: string) => {
  const map = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
  }
  return map[severity as keyof typeof map] || severity
}

const selectDisruption = (disruption: Disruption) => {
  selectedDisruption.value = disruption
}
</script>

<style scoped>
.alerts-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
}

.alerts-header {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.alerts-header h1 {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #2563eb;
  color: white;
}

.filter-btn:hover:not(.active) {
  background: #e5e7eb;
}

.alerts-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.predictions-section {
  margin-bottom: 1rem;
}

.prediction-card {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 1px solid #93c5fd;
  border-radius: 1rem;
  padding: 1rem;
}

.prediction-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.prediction-header svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #1e40af;
}

.prediction-header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1e3a8a;
}

.prediction-item {
  margin-top: 0.5rem;
}

.prediction-item p {
  margin: 0;
  font-size: 0.875rem;
  color: #1e40af;
}

.disruptions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.disruption-card {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.disruption-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.disruption-card:active {
  transform: translateY(0);
}

.disruption-main {
  display: flex;
  gap: 0.75rem;
}

.icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-wrapper.train {
  background: #fee2e2;
  color: #dc2626;
}

.icon-wrapper.bus {
  background: #d1fae5;
  color: #059669;
}

.icon-wrapper svg {
  width: 1.25rem;
  height: 1.25rem;
}

.disruption-info {
  flex: 1;
  min-width: 0;
}

.disruption-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.line-number {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

.severity-badge {
  padding: 0.125rem 0.625rem;
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

.disruption-description {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
}

.disruption-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.75rem;
  color: #9ca3af;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.meta-item svg {
  width: 0.875rem;
  height: 0.875rem;
}

.text-green {
  color: #059669;
}

.text-yellow {
  color: #d97706;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: #9ca3af;
}

.empty-state svg {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  color: #d1d5db;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #6b7280;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}
</style>

