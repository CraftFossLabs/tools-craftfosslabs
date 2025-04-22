export async function registerServiceWorkerAndSubscribe() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('✅ Service Worker registered');

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const publicKey = `${import.meta.env.VITE_APP_PublicKey}`;
    const convertedKey = urlBase64ToUint8Array(publicKey);

    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      // Unsubscribe old subscription if exists
      console.log('⚠️ Unsubscribing old subscription...');
      await existingSubscription.unsubscribe();
    }

    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    console.log('📦 New Push Subscription:', newSubscription);

    await fetch('http://localhost:8000/api/tools/push/subscribe', {
      method: 'POST',
      body: JSON.stringify(newSubscription),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}
