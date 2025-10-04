# 📱 Руководство по мобильной разработке

## 🎯 Варианты создания мобильного приложения с Vue

### Вариант 1: PWA (Progressive Web App) - Самый простой
**Преимущества:**
- Работает в браузере
- Можно добавить на главный экран
- Не требует магазинов приложений
- Легко обновлять

**Как использовать:**
1. Запустите `npm run dev`
2. Откройте на телефоне в браузере
3. В меню браузера выберите "Добавить на главный экран"

### Вариант 2: Ionic Framework - Рекомендуется для мобильных приложений
**Преимущества:**
- Готовые мобильные компоненты
- Нативный вид и анимации
- Доступ к нативным функциям
- Можно публиковать в App Store/Google Play

**Установка Ionic с Vue:**
```bash
# Установить Ionic CLI
npm install -g @ionic/cli

# Создать новый Ionic проект с Vue
ionic start my-app blank --type=vue

# Или конвертировать текущий проект
npm install @ionic/vue @ionic/vue-router
```

### Вариант 3: Capacitor - Для нативных приложений
**Преимущества:**
- Превращает ваше веб-приложение в нативное
- Полный доступ к нативным API
- Публикация в магазинах
- Работает с существующим Vue проектом

**Установка:**
```bash
# Установить Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init "App Name" "com.example.app"

# Добавить платформы
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

# Собрать и открыть в IDE
npm run build
npx cap sync
npx cap open android  # Откроет Android Studio
npx cap open ios      # Откроет Xcode (только на Mac)
```

### Вариант 4: Quasar Framework - Универсальное решение
**Преимущества:**
- Vue + мобильные компоненты
- Один код для web, mobile, desktop
- Material Design и iOS стили
- Много готовых компонентов

**Установка:**
```bash
npm install -g @quasar/cli
quasar create my-app
cd my-app
quasar dev -m cordova -T android
```

## 🛠️ Тестирование на реальном устройстве

### Способ 1: Через локальную сеть
1. Запустите `npm run dev`
2. В терминале увидите адрес типа: `http://192.168.1.100:5173`
3. Откройте этот адрес на телефоне (убедитесь, что телефон и компьютер в одной сети)

### Способ 2: Через ngrok (для тестирования из любой сети)
```bash
# Установить ngrok
npm install -g ngrok

# Запустить ngrok
ngrok http 5173

# Откройте предоставленный URL на телефоне
```

### Способ 3: Через USB отладку (Android)
```bash
# В Chrome DevTools включить Port Forwarding
# Settings -> Devices -> Port forwarding
# Добавить: 5173 -> localhost:5173
```

## 🎨 Оптимизация для мобильных устройств

### 1. Viewport метатег (уже добавлен)
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

### 2. Touch события
```javascript
// Использовать @touchstart вместо @click для лучшей отзывчивости
<button @touchstart="handleTouch">Кнопка</button>
```

### 3. Оптимизация анимаций
```css
/* Использовать transform вместо position */
.element {
  transform: translateX(100px);
  will-change: transform; /* Подсказка браузеру */
}
```

### 4. Виртуальный скроллинг для длинных списков
```bash
npm install vue-virtual-scroller
```

## 📲 Добавление нативных функций

### Геолокация
```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position.coords.latitude, position.coords.longitude)
  })
}
```

### Камера (с Capacitor)
```bash
npm install @capacitor/camera
```

```javascript
import { Camera, CameraResultType } from '@capacitor/camera'

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  })
  return image.webPath
}
```

### Push уведомления (с Capacitor)
```bash
npm install @capacitor/push-notifications
```

### Вибрация
```javascript
if (navigator.vibrate) {
  navigator.vibrate(200) // 200ms
}
```

## 🚀 Публикация в магазины

### Google Play (Android)
1. Соберите приложение: `npm run build && npx cap sync`
2. В Android Studio: Build -> Generate Signed Bundle/APK
3. Загрузите в Google Play Console

### App Store (iOS)
1. Соберите приложение: `npm run build && npx cap sync`
2. В Xcode: Product -> Archive
3. Загрузите через App Store Connect

## 💡 Полезные библиотеки для мобильных приложений

```bash
# Жесты
npm install vue3-touch-events

# Нижнее меню (Bottom Sheet)
npm install @vueuse/core

# Свайп
npm install vue3-swiper

# Pull to refresh
npm install vue-pull-refresh

# Бесконечный скролл
npm install vue-infinite-loading

# Хранилище данных
npm install localforage

# Работа с формами
npm install vee-validate
```

## 🔧 Рекомендуемая структура для мобильного приложения

```
src/
├── views/          # Экраны приложения
├── components/     # Переиспользуемые компоненты
├── composables/    # Vue composables (логика)
├── stores/         # Pinia stores (состояние)
├── services/       # API сервисы
├── utils/          # Утилиты
└── types/          # TypeScript типы
```

## 📱 Советы по UX для мобильных приложений

1. **Минимальный размер кнопок**: 44x44px (рекомендация Apple)
2. **Большие области для нажатия**: добавляйте padding
3. **Нижняя навигация**: для основных разделов (2-5 пунктов)
4. **Жесты**: свайп назад, pull-to-refresh
5. **Feedback**: тактильный отклик при нажатиях
6. **Загрузка**: показывайте скелетоны или спиннеры
7. **Оффлайн режим**: кэшируйте данные
8. **Темная тема**: поддержка для экономии батареи OLED

## 🎯 Следующие шаги

1. ✅ Базовое приложение создано
2. ⬜ Добавить Pinia для управления состоянием
3. ⬜ Настроить API интеграцию
4. ⬜ Добавить анимации переходов
5. ⬜ Настроить PWA (Service Worker)
6. ⬜ Добавить темную тему
7. ⬜ Интегрировать Capacitor для нативных функций
8. ⬜ Оптимизировать производительность
9. ⬜ Добавить тесты
10. ⬜ Подготовить к публикации

Удачи в разработке! 🚀

