// firebase-messaging-sw.js
// 반드시 GitHub 저장소 루트(/)에 위치해야 합니다

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyCtcL6kV123cStqkqETsY0YHFS3IsmfvLE",
  authDomain:        "wait-less-cf9af.firebaseapp.com",
  projectId:         "wait-less-cf9af",
  storageBucket:     "wait-less-cf9af.firebasestorage.app",
  messagingSenderId: "841177624449",
  appId:             "1:841177624449:web:fab335c2f79b4bf1c2c280",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 처리
messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || "Wait-Less";
  const body  = payload.notification?.body  || "입장 차례입니다!";

  self.registration.showNotification(title, {
    body,
    icon:  "/wait-less/icon.png",
    badge: "/wait-less/icon.png",
    data:  payload.data,
    vibrate: [200, 100, 200],
    requireInteraction: true,   // 사용자가 탭하기 전까지 알림 유지
  });
});

// 알림 클릭 시 status.html로 이동
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const id  = event.notification.data?.id || "";
  const url = `https://kbj2425.github.io/wait-less/status.html?id=${id}`;
  event.waitUntil(clients.openWindow(url));
});
