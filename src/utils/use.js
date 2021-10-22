import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash-es";

export function useOnline() {
  const online = ref(window.navigator.onLine);

  const handleOnline = () => {
    online.value = true;
  };
  const handleOffline = () => {
    online.value = false;
  };

  onMounted(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  });

  onUnmounted(() => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  });

  return online;
}

export function useInterval(fn, duration) {
  if (duration <= 0) {
    throw new Error("Duration must be greater than 0");
  }

  const timer = setInterval(fn, duration);

  onUnmounted(() => {
    clearInterval(timer);
  });
}

export function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const handleResize = debounce(() => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }, 100);

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return { width, height };
}
