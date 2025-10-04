<template>
  <div id="app">
    <div class="mobile-container">
      <!-- Контент страницы -->
      <main class="app-content">
        <router-view />
      </main>

      <!-- Нижняя навигация -->
      <nav class="bottom-nav">
        <router-link to="/" class="nav-item" :class="{ active: currentRoute === '/' }">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span class="nav-label">Mapa</span>
        </router-link>

        <router-link to="/alerts" class="nav-item" :class="{ active: currentRoute === '/alerts' }">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="nav-label">Alerty</span>
        </router-link>

        <router-link to="/profile" class="nav-item" :class="{ active: currentRoute === '/profile' }">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="nav-label">Profil</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentRoute = computed(() => route.path)
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}

.mobile-container {
  max-width: 480px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.app-content {
  flex: 1;
  overflow-y: auto;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 0.5rem 0;
  box-shadow: 0 -4px 12px -1px rgb(0 0 0 / 0.05);
  flex-shrink: 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #9e9e9e;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 60px;
}

.nav-item.active {
  color: #2563eb;
}

.nav-item.active .nav-icon {
  stroke: #2563eb;
  transform: scale(1.1);
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 0.25rem;
  transition: transform 0.2s ease;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 500;
}

@media (min-width: 768px) {
  .mobile-container {
    max-width: 768px;
  }
}
</style>

