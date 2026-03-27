// --- 1. Firebase Config จากที่คุณส่งมา ---
const firebaseConfig = {
  apiKey: "AIzaSyDfsPbmFn1z4eUsqD0nRzz47X1LFlNPV9E",
  authDomain: "mynovelreader-7fea4.firebaseapp.com",
  projectId: "mynovelreader-7fea4",
  storageBucket: "mynovelreader-7fea4.firebasestorage.app",
  messagingSenderId: "758204370201",
  appId: "1:758204370201:web:962a4bbdb0d5acfcb98988",
  measurementId: "G-EXP3JN1NBP"
};

// --- 2. โหลด Firebase SDK ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- 3. ตรวจสอบสิทธิ์การเข้าถึง ---
onAuthStateChanged(auth, (user) => {
    const isLoginPage = window.location.pathname.includes("login.html");
    if (!user && !isLoginPage) {
        // ถ้ายังไม่ได้เข้าสู่ระบบ และไม่ได้อยู่ที่หน้า login ให้เด้งไปหน้า login
        window.location.href = "login.html";
    }
});

// ฟังก์ชันสำหรับปุ่มออกจากระบบ (ถ้าต้องการใช้)
window.logout = function() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
};