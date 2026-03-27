// --- 1. Firebase Config ---
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

// --- 4. ระบบ Timeout (Auto Logout เมื่อไม่มีการใช้งาน) ---
let timeout;
const INACTIVITY_TIME = 30 * 60 * 1000; // ตั้งค่าไว้ที่ 30 นาที

function resetTimer() {
    clearTimeout(timeout);
    // ตรวจสอบว่าล็อกอินอยู่หรือไม่ก่อนเริ่มนับถอยหลัง
    if (auth.currentUser) {
        timeout = setTimeout(() => {
            alert("เซสชันหมดอายุเนื่องจากไม่มีการใช้งานนานเกินไป กรุณาเข้าสู่ระบบใหม่");
            window.logout(); 
        }, INACTIVITY_TIME);
    }
}

// ฟังก์ชันสำหรับปุ่มออกจากระบบ
window.logout = function() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
};

// ตรวจจับการเคลื่อนไหวเพื่อรีเซ็ตตัวจับเวลา
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer; 
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;