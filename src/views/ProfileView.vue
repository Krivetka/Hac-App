<template>
  <div class="profile-view">
    <div class="profile-header">
      <div class="avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <h2>{{ user.name }}</h2>
      <div class="points-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <span>{{ user.points }} punktów</span>
      </div>
    </div>

    <div class="profile-content">
      <section class="reports-section">
        <h3>Twoje zgłoszenia</h3>
        <div class="reports-list">
          <div 
            v-for="report in user.reports" 
            :key="report.id"
            class="report-card"
          >
            <div class="report-main">
              <div>
                <p class="report-line">{{ report.line }}</p>
                <p class="report-description">{{ report.description }}</p>
              </div>
              <div :class="['report-status', `status-${report.status}`]">
                {{ getStatusText(report.status) }}
                <span v-if="report.status === 'verified'" class="points">+{{ report.points }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="favorites-section">
        <h3>Ulubione trasy</h3>
        <div class="empty-favorites">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          <p>Nie masz jeszcze ulubionych tras.</p>
          <button class="add-route-btn">Dodaj trasę</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mockUserProfile } from '../data/mockData'

const user = ref(mockUserProfile)

const getStatusText = (status: string) => {
  const map = {
    verified: 'Zweryfikowane',
    pending: 'Oczekuje',
    rejected: 'Odrzucono'
  }
  return map[status as keyof typeof map] || status
}
</script>

<style scoped>
.profile-view {
  height: 100%;
  overflow-y: auto;
  background: #f9fafb;
}

.profile-header {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
}

.avatar {
  width: 5rem;
  height: 5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 4px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  backdrop-filter: blur(10px);
}

.avatar svg {
  width: 2.5rem;
  height: 2.5rem;
}

.profile-header h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.points-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.points-badge svg {
  width: 1.5rem;
  height: 1.5rem;
  fill: #fbbf24;
  stroke: #f59e0b;
}

.points-badge span {
  font-size: 1.125rem;
  font-weight: 700;
}

.profile-content {
  padding: 1rem;
}

.reports-section,
.favorites-section {
  margin-bottom: 1.5rem;
}

.reports-section h3,
.favorites-section h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.reports-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.report-card {
  background: white;
  border-radius: 0.75rem;
  padding: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
}

.report-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.report-line {
  margin: 0 0 0.25rem 0;
  font-weight: 700;
  color: #111827;
}

.report-description {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.report-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
}

.status-verified {
  background: #d1fae5;
  color: #065f46;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}

.points {
  font-weight: 700;
  font-size: 0.875rem;
}

.empty-favorites {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
}

.empty-favorites svg {
  width: 2.5rem;
  height: 2.5rem;
  color: #d1d5db;
  margin-bottom: 0.5rem;
}

.empty-favorites p {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.add-route-btn {
  padding: 0.5rem 1.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.add-route-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.add-route-btn:active {
  transform: translateY(0);
}
</style>

