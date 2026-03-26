// 1. โหลดไฟล์หนังสือ (ต้องชื่อตรงกับไฟล์ในโฟลเดอร์)
const book = ePub("./mybook.epub"); 
const rendition = book.renderTo("viewer", {
    width: "100%",
    height: "100%",
    flow: "paginated" // แบบเปิดทีละหน้าเหมือนหนังสือ
});

// แสดงหน้าแรก
rendition.display();

// 2. ปรับขนาดตัวอักษร
let fontSize = 100;
function changeFontSize(v) {
    fontSize += v;
    rendition.themes.fontSize(fontSize + "%");
}

// 3. ปุ่มเปลี่ยนหน้า
document.getElementById("next").addEventListener("click", () => rendition.next());
document.getElementById("prev").addEventListener("click", () => rendition.prev());

// 4. สารบัญ
book.loaded.navigation.then((nav) => {
    const toc = document.getElementById("toc");
    nav.forEach(chapter => {
        const option = document.createElement("option");
        option.textContent = chapter.label;
        option.value = chapter.href;
        toc.appendChild(option);
    });
});
document.getElementById("toc").onchange = (e) => rendition.display(e.target.value);

// 5. โหมดมืด
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    rendition.themes.register("dark", { "body": { "color": "#ccc", "background": "#1a1a1a" }});
    rendition.themes.select(isDark ? "dark" : "default");
};