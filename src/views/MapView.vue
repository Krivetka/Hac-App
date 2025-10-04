<template>
  <div class="map-view">
    <!-- Поиск маршрута -->
    <header class="search-header">
      <div class="route-search">
        <!-- Откуда -->
        <div class="search-input-wrapper">
          <div class="location-indicator start"></div>
          <input 
            type="text" 
            v-model="fromLocation"
            @input="filterFromSuggestions"
            @focus="showFromSuggestions = true"
            @blur="hideFromSuggestions"
            placeholder="Skąd? (np. Dworzec Główny)" 
            class="search-input"
          />
          <transition name="fade">
            <div v-if="showFromSuggestions && fromSuggestions.length" class="suggestions-dropdown">
              <div 
                v-for="stop in fromSuggestions" 
                :key="stop.id"
                class="suggestion-item"
                @mousedown.prevent="selectFromStop(stop)"
              >
                <div class="suggestion-icon">
                  <svg v-if="stop.type === 'tram'" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 16.94V8.5c0-2.79-2.61-3.4-6.01-3.49l.76-1.51H17V2H7v1.5h4.75l-.76 1.52C7.86 5.11 5 5.73 5 8.5v8.44c0 1.45 1.19 2.66 2.59 2.97L6 21.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 20h-.08c1.69 0 2.58-1.37 2.58-3.06zm-7 1.56c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-4.5H7V9h10v5z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                  </svg>
                </div>
                <div class="suggestion-content">
                  <div class="suggestion-name">{{ stop.name }}</div>
                  <div class="suggestion-lines">
                    <span v-for="line in stop.lines.slice(0, 5)" :key="line" class="line-badge">{{ line }}</span>
                    <span v-if="stop.lines.length > 5" class="more-lines">+{{ stop.lines.length - 5 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Куда -->
        <div class="search-input-wrapper">
          <div class="location-indicator end"></div>
          <input 
            type="text" 
            v-model="toLocation"
            @input="filterToSuggestions"
            @focus="showToSuggestions = true"
            @blur="hideToSuggestions"
            placeholder="Dokąd? (np. Kraków Airport)" 
            class="search-input"
          />
          <transition name="fade">
            <div v-if="showToSuggestions && toSuggestions.length" class="suggestions-dropdown">
              <div 
                v-for="stop in toSuggestions" 
                :key="stop.id"
                class="suggestion-item"
                @mousedown.prevent="selectToStop(stop)"
              >
                <div class="suggestion-icon">
                  <svg v-if="stop.type === 'tram'" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 16.94V8.5c0-2.79-2.61-3.4-6.01-3.49l.76-1.51H17V2H7v1.5h4.75l-.76 1.52C7.86 5.11 5 5.73 5 8.5v8.44c0 1.45 1.19 2.66 2.59 2.97L6 21.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 20h-.08c1.69 0 2.58-1.37 2.58-3.06zm-7 1.56c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-4.5H7V9h10v5z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                  </svg>
                </div>
                <div class="suggestion-content">
                  <div class="suggestion-name">{{ stop.name }}</div>
                  <div class="suggestion-lines">
                    <span v-for="line in stop.lines.slice(0, 5)" :key="line" class="line-badge">{{ line }}</span>
                    <span v-if="stop.lines.length > 5" class="more-lines">+{{ stop.lines.length - 5 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Время и кнопка поиска -->
        <div class="search-actions">
          <button @click="showTimeSelector = true" class="time-selector-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {{ selectedTime }}
          </button>
          <button @click="searchRoute" class="search-btn">
            Szukaj połączenia
          </button>
        </div>

        <!-- Кнопка показа карты -->
        <button v-if="routeResults.length" @click="showMapView = !showMapView" class="map-toggle-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          {{ showMapView ? 'Ukryj mapę' : 'Pokaż mapę' }}
        </button>
      </div>
    </header>

    <!-- Карта остановок -->
    <div v-if="showMapView && routeResults.length" class="map-view-container">
      <div class="map-placeholder">
        <div class="map-info">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p>Mapa trasy z przystankami</p>
          <span class="map-note">Интеграция с Google Maps / OpenStreetMap</span>
        </div>
        
        <!-- Маркеры остановок -->
        <div class="stops-list">
          <div v-if="selectedFromStop" class="map-stop-item start">
            <div class="stop-marker start-marker">A</div>
            <div>
              <div class="stop-name">{{ selectedFromStop.name }}</div>
              <div class="stop-lines">
                <span v-for="line in selectedFromStop.lines.slice(0, 3)" :key="line" class="line-mini-badge">{{ line }}</span>
              </div>
            </div>
          </div>
          
          <div class="route-line"></div>
          
          <div v-if="selectedToStop" class="map-stop-item end">
            <div class="stop-marker end-marker">B</div>
            <div>
              <div class="stop-name">{{ selectedToStop.name }}</div>
              <div class="stop-lines">
                <span v-for="line in selectedToStop.lines.slice(0, 3)" :key="line" class="line-mini-badge">{{ line }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Результаты поиска маршрутов -->
    <div v-if="!showMapView || !routeResults.length" class="routes-container">
      <div v-if="!routeResults.length" class="no-results">
        <div class="no-results-icon">🚌</div>
        <h3>Zaplanuj swoją podróż</h3>
        <p>Wpisz punkt początkowy i docelowy, aby znaleźć najlepsze połączenie</p>
      </div>

      <div v-else class="routes-list">
        <div 
          v-for="route in routeResults" 
          :key="route.id"
          class="route-card"
          @click="selectRoute(route)"
        >
          <div v-if="route.recommended" class="recommended-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            Najszybsza
          </div>

          <div class="route-header">
            <div class="route-time">
              <span class="departure">{{ route.departure }}</span>
              <div class="time-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
              <span class="arrival">{{ route.arrival }}</span>
            </div>
            <div class="route-duration">{{ route.totalDuration }} min</div>
          </div>

          <div class="route-details">
            <div class="route-transfers">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
              <span>{{ route.transfers === 0 ? 'Bez przesiadek' : `${route.transfers} ${route.transfers === 1 ? 'przesiadka' : 'przesiadki'}` }}</span>
            </div>
            <div class="route-steps-preview">
              <div 
                v-for="(step, idx) in route.steps.filter(s => s.type !== 'walk')" 
                :key="idx"
                :class="['transport-badge', step.type]"
              >
                <span v-if="step.line">{{ step.line }}</span>
                <span v-else class="transport-icon">🚶</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопка добавления сообщения о проблеме -->
      <button @click="showReportForm = true" class="floating-report-btn" title="Zgłoś problem">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
    </div>

    <!-- Форма отчета -->
    <teleport to="body">
      <transition name="slide-up-full">
        <div v-if="showReportForm" class="report-form-overlay">
          <div class="report-form">
            <div class="report-header">
              <h2>Zgłoś utrudnienie</h2>
              <button @click="showReportForm = false" class="close-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form @submit.prevent="submitReport" class="report-form-content">
              <div class="form-group">
                <label>Typ transportu</label>
                <div class="transport-types">
                  <button 
                    type="button"
                    :class="['transport-btn', { active: reportForm.type === 'train' }]"
                    @click="reportForm.type = 'train'"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="8" width="18" height="13" rx="2"></rect>
                      <path d="M3 12h18M8 21v-1m8 1v-1"></path>
                    </svg>
                    Pociąg / SKM
                  </button>
                  <button 
                    type="button"
                    :class="['transport-btn', { active: reportForm.type === 'bus' }]"
                    @click="reportForm.type = 'bus'"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17h10l3 3v-3h2V6H2v11h2v3z"></path>
                      <rect x="6" y="6" width="12" height="5"></rect>
                    </svg>
                    Autobus / Tramwaj
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label for="line">Numer linii</label>
                <input 
                  type="text" 
                  id="line"
                  v-model="reportForm.line"
                  placeholder="np. S1, 523, M2"
                  required
                />
              </div>

              <div class="form-group">
                <label for="location">Lokalizacja (przystanek/stacja)</label>
                <div class="input-with-icon">
                  <input 
                    type="text" 
                    id="location"
                    v-model="reportForm.location"
                    placeholder="np. Metro Centrum, Dw. Centralny"
                    required
                  />
                  <button type="button" class="location-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label for="problemType">Rodzaj problemu</label>
                <select id="problemType" v-model="reportForm.problemType" required>
                  <option>Opóźnienie</option>
                  <option>Odwołany kurs</option>
                  <option>Awaria pojazdu</option>
                  <option>Wypadek / Zdarzenie</option>
                  <option>Duży tłok</option>
                  <option>Inne</option>
                </select>
              </div>

              <div class="form-group">
                <label for="description">Krótki opis (opcjonalnie)</label>
                <textarea 
                  id="description"
                  v-model="reportForm.description"
                  rows="3"
                  placeholder="Dodaj więcej szczegółów..."
                ></textarea>
              </div>

              <button type="submit" class="submit-btn">
                Wyślij zgłoszenie
              </button>
            </form>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Селектор времени -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="showTimeSelector" class="time-selector-overlay" @click="showTimeSelector = false">
          <div class="time-selector-content" @click.stop>
            <h3>Wybierz czas wyjazdu</h3>
            <div class="time-options">
              <button 
                v-for="option in timeOptions" 
                :key="option.value"
                :class="['time-option', { active: selectedTimeValue === option.value }]"
                @click="selectTime(option)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ option.label }}
              </button>
            </div>
            <button @click="showTimeSelector = false" class="close-time-btn">Zamknij</button>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Детали маршрута -->
    <teleport to="body">
      <transition name="slide-up-full">
        <div v-if="selectedRoute" class="route-details-overlay" @click="selectedRoute = null">
          <div class="route-details-modal" @click.stop>
            <div class="route-details-header">
              <button @click="selectedRoute = null" class="back-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <div class="route-details-time">
                <span>{{ selectedRoute.departure }} → {{ selectedRoute.arrival }}</span>
                <span class="duration">({{ selectedRoute.totalDuration }} min)</span>
              </div>
              <button class="favorite-btn" title="Dodaj do ulubionych">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </button>
            </div>

            <div class="route-steps-list">
              <div 
                v-for="(step, idx) in selectedRoute.steps" 
                :key="idx"
                class="step-item"
              >
                <div class="step-timeline">
                  <div :class="['timeline-dot', step.type]"></div>
                  <div v-if="idx < selectedRoute.steps.length - 1" class="timeline-line"></div>
                </div>

                <div class="step-content">
                  <div class="step-header">
                    <div class="step-time">{{ step.departure }}</div>
                    <div v-if="step.type !== 'walk'" :class="['step-line-badge', step.type]">
                      <svg v-if="step.type === 'metro'" class="step-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm5.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6h-5V6h5v5z"/>
                      </svg>
                      <svg v-else-if="step.type === 'bus'" class="step-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                      </svg>
                      <svg v-else-if="step.type === 'tram'" class="step-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 16.94V8.5c0-2.79-2.61-3.4-6.01-3.49l.76-1.51H17V2H7v1.5h4.75l-.76 1.52C7.86 5.11 5 5.73 5 8.5v8.44c0 1.45 1.19 2.66 2.59 2.97L6 21.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 20h-.08c1.69 0 2.58-1.37 2.58-3.06zm-7 1.56c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-4.5H7V9h10v5z"/>
                      </svg>
                      <svg v-else-if="step.type === 'train'" class="step-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zm8 1.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7H6V5h12v5z"/>
                      </svg>
                      {{ step.line }}
                    </div>
                    <div v-if="step.delay" class="delay-badge">+{{ step.delay }} min</div>
                  </div>

                  <div class="step-location">
                    <strong>{{ step.from }}</strong>
                  </div>

                  <div class="step-info">
                    <span v-if="step.type === 'walk'">🚶 {{ step.duration }} min pieszo</span>
                    <span v-else>
                      {{ step.stops }} {{ step.stops === 1 ? 'przystanek' : 'przystanków' }} ({{ step.duration }} min)
                    </span>
                  </div>

                  <div v-if="idx === selectedRoute.steps.length - 1" class="step-location final">
                    <div class="step-time">{{ step.arrival }}</div>
                    <strong>{{ step.to }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

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
import { mockRouteResults, type RouteOption, mockStops, type Stop } from '../data/routesData'
import DisruptionDetails from '../components/DisruptionDetails.vue'

const fromLocation = ref('')
const toLocation = ref('')
const showFromSuggestions = ref(false)
const showToSuggestions = ref(false)
const showReportForm = ref(false)
const showTimeSelector = ref(false)
const showMapView = ref(false)
const selectedDisruption = ref<Disruption | null>(null)
const selectedRoute = ref<RouteOption | null>(null)
const selectedFromStop = ref<Stop | null>(null)
const selectedToStop = ref<Stop | null>(null)
const selectedTimeValue = ref('now')
const routeResults = ref<RouteOption[]>([])
const fromSuggestions = ref<Stop[]>([])
const toSuggestions = ref<Stop[]>([])

const timeOptions = [
  { label: 'Teraz', value: 'now' },
  { label: 'Za 5 minut', value: '5min' },
  { label: 'Za 10 minut', value: '10min' },
  { label: 'Za 15 minut', value: '15min' },
  { label: 'Za 30 minut', value: '30min' },
  { label: 'Za 1 godzinę', value: '1h' },
]

const selectedTime = computed(() => {
  const option = timeOptions.find(o => o.value === selectedTimeValue.value)
  return option?.label || 'Teraz'
})

const selectTime = (option: typeof timeOptions[0]) => {
  selectedTimeValue.value = option.value
  showTimeSelector.value = false
}

// Фильтрация подсказок для "Откуда"
const filterFromSuggestions = () => {
  if (fromLocation.value.length < 2) {
    fromSuggestions.value = []
    return
  }
  
  const query = fromLocation.value.toLowerCase()
  fromSuggestions.value = mockStops.filter(stop => 
    stop.name.toLowerCase().includes(query)
  ).slice(0, 8)
}

// Фильтрация подсказок для "Куда"
const filterToSuggestions = () => {
  if (toLocation.value.length < 2) {
    toSuggestions.value = []
    return
  }
  
  const query = toLocation.value.toLowerCase()
  toSuggestions.value = mockStops.filter(stop => 
    stop.name.toLowerCase().includes(query)
  ).slice(0, 8)
}

// Выбор остановки "Откуда"
const selectFromStop = (stop: Stop) => {
  selectedFromStop.value = stop
  fromLocation.value = stop.name
  showFromSuggestions.value = false
  fromSuggestions.value = []
}

// Выбор остановки "Куда"
const selectToStop = (stop: Stop) => {
  selectedToStop.value = stop
  toLocation.value = stop.name
  showToSuggestions.value = false
  toSuggestions.value = []
}

// Скрыть подсказки с задержкой
const hideFromSuggestions = () => {
  setTimeout(() => {
    showFromSuggestions.value = false
  }, 200)
}

const hideToSuggestions = () => {
  setTimeout(() => {
    showToSuggestions.value = false
  }, 200)
}

const searchRoute = () => {
  if (fromLocation.value && toLocation.value) {
    console.log('Szukanie trasy:', {
      from: fromLocation.value,
      to: toLocation.value,
      time: selectedTimeValue.value
    })
    // Загружаем результаты поиска
    routeResults.value = mockRouteResults
    showMapView.value = false
  }
}

const selectRoute = (route: RouteOption) => {
  selectedRoute.value = route
}

const selectDisruption = (disruption: Disruption) => {
  selectedDisruption.value = disruption
}

const reportForm = ref({
  type: 'train',
  line: '',
  location: '',
  problemType: 'Opóźnienie',
  description: ''
})

const submitReport = () => {
  console.log('Report submitted:', reportForm.value)
  showReportForm.value = false
  reportForm.value = {
    type: 'train',
    line: '',
    location: '',
    problemType: 'Задержка',
    description: ''
  }
}
</script>

<style scoped>
.map-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-header {
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.route-search {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.location-indicator {
  position: absolute;
  left: 1rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  z-index: 1;
}

.location-indicator.start {
  background: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.location-indicator.end {
  background: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
}

/* Автокомплит */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  margin-top: 0.25rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  max-height: 20rem;
  overflow-y: auto;
  z-index: 100;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f3f4f6;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: #f9fafb;
}

.suggestion-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
  flex-shrink: 0;
}

.suggestion-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
}

.suggestion-content {
  flex: 1;
  min-width: 0;
}

.suggestion-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.suggestion-lines {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.line-badge {
  padding: 0.125rem 0.375rem;
  background: #e5e7eb;
  color: #374151;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 700;
}

.more-lines {
  font-size: 0.625rem;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  background: white;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.time-selector-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.time-selector-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

.time-selector-btn:hover {
  background: white;
  border-color: #2563eb;
}

.search-btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.search-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
}

.search-btn:active {
  transform: translateY(0);
}

.map-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.75rem;
}

.map-toggle-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

.map-toggle-btn:hover {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.time-selector-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.time-selector-content {
  background: white;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  max-width: 480px;
  width: 100%;
  animation: slideUp 0.3s ease-out;
}

.time-selector-content h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.time-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.time-option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.time-option svg {
  width: 1.125rem;
  height: 1.125rem;
}

.time-option:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}

.time-option.active {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.close-time-btn {
  width: 100%;
  padding: 0.875rem;
  background: #f3f4f6;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.close-time-btn:hover {
  background: #e5e7eb;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.routes-container {
  flex: 1;
  background: #f9fafb;
  overflow-y: auto;
  padding: 1rem;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #6b7280;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
}

.no-results p {
  margin: 0;
  font-size: 0.875rem;
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.route-card {
  position: relative;
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.route-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.route-card:active {
  transform: translateY(0);
}

.recommended-badge {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.recommended-badge svg {
  width: 0.875rem;
  height: 0.875rem;
}

.route-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.route-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.time-arrow {
  color: #9ca3af;
}

.time-arrow svg {
  width: 1rem;
  height: 1rem;
}

.route-duration {
  font-size: 1rem;
  font-weight: 700;
  color: #2563eb;
}

.route-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.route-transfers {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.route-transfers svg {
  width: 1rem;
  height: 1rem;
}

.route-steps-preview {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.transport-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.transport-badge.metro {
  background: #dc2626;
}

.transport-badge.bus {
  background: #2563eb;
}

.transport-badge.tram {
  background: #059669;
}

.transport-badge.train {
  background: #7c3aed;
}

.transport-icon {
  font-size: 0.875rem;
}

.floating-report-btn {
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
  cursor: pointer;
  transition: all 0.2s;
  z-index: 100;
}

.floating-report-btn:hover {
  background: #d97706;
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(245, 158, 11, 0.4);
}

.floating-report-btn:active {
  transform: scale(0.95);
}

.floating-report-btn svg {
  width: 1.5rem;
  height: 1.5rem;
}

.report-form-overlay {
  position: fixed;
  inset: 0;
  background: white;
  z-index: 999;
  overflow-y: auto;
}

.report-form {
  max-width: 480px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.report-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #6b7280;
}

.close-btn svg {
  width: 1.5rem;
  height: 1.5rem;
}

.report-form-content {
  flex: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.transport-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.transport-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 0.75rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.transport-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.transport-btn.active {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.input-with-icon {
  position: relative;
}

.location-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0.25rem;
}

.location-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.submit-btn {
  margin-top: auto;
  padding: 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  transition: all 0.2s;
}

.submit-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.submit-btn:active {
  transform: translateY(0) scale(0.98);
}

.slide-up-full-enter-active,
.slide-up-full-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-full-enter-from {
  transform: translateY(100%);
}

.slide-up-full-leave-to {
  transform: translateY(100%);
}

/* Детали маршрута */
.route-details-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.route-details-modal {
  position: absolute;
  inset: 0;
  background: white;
  display: flex;
  flex-direction: column;
}

.route-details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.back-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #374151;
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

.route-details-time {
  flex: 1;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.route-details-time .duration {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin-left: 0.5rem;
}

.favorite-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6b7280;
  border-radius: 50%;
  transition: all 0.2s;
}

.favorite-btn:hover {
  background: #fef3c7;
  color: #f59e0b;
}

.favorite-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.route-steps-list {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1rem;
  background: #f9fafb;
}

.step-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.25rem;
}

.timeline-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 3px solid;
  background: white;
  flex-shrink: 0;
}

.timeline-dot.walk {
  border-color: #9ca3af;
}

.timeline-dot.metro {
  border-color: #dc2626;
}

.timeline-dot.bus {
  border-color: #2563eb;
}

.timeline-dot.tram {
  border-color: #059669;
}

.timeline-dot.train {
  border-color: #7c3aed;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: #e5e7eb;
  min-height: 2rem;
  margin: 0.25rem 0;
}

.step-content {
  flex: 1;
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.step-time {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

.step-line-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
}

.step-line-badge.metro {
  background: #dc2626;
}

.step-line-badge.bus {
  background: #2563eb;
}

.step-line-badge.tram {
  background: #059669;
}

.step-line-badge.train {
  background: #7c3aed;
}

.step-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.delay-badge {
  padding: 0.25rem 0.5rem;
  background: #fef3c7;
  color: #92400e;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.step-location {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.step-location strong {
  font-weight: 600;
}

.step-location.final {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  margin-bottom: 0;
}

.step-info {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Вид карты */
.map-view-container {
  flex: 1;
  background: #f9fafb;
  overflow-y: auto;
  padding: 1rem;
}

.map-placeholder {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  min-height: 25rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.map-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
}

.map-info svg {
  width: 3rem;
  height: 3rem;
  color: #2563eb;
  margin-bottom: 1rem;
}

.map-info p {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.map-note {
  font-size: 0.75rem;
  color: #9ca3af;
}

.stops-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.map-stop-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 2px solid;
}

.map-stop-item.start {
  border-color: #93c5fd;
  background: #eff6ff;
}

.map-stop-item.end {
  border-color: #fca5a5;
  background: #fef2f2;
}

.stop-marker {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: white;
  flex-shrink: 0;
}

.start-marker {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.end-marker {
  background: #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.stop-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.stop-lines {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.line-mini-badge {
  padding: 0.125rem 0.375rem;
  background: white;
  border: 1px solid #e5e7eb;
  color: #374151;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 700;
}

.route-line {
  width: 2px;
  height: 2rem;
  background: linear-gradient(to bottom, #2563eb, #dc2626);
  margin-left: 1.25rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

