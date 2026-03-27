const urlParams = new URLSearchParams(window.location.search);
const bookFile = urlParams.get('book');

// หาตอนทั้งหมดในเล่มที่กำลังอ่าน
let episodes = [];
for (let id in bookData) {
    if (bookData[id].chapters.some(ch => ch.file === bookFile)) {
        episodes = bookData[id].chapters;
        break;
    }
}
if (episodes.length === 0) episodes = bookData['vol1'].chapters;

// โหลดหนังสือ
const book = ePub("./" + (bookFile || episodes[0].file));
const rendition = book.renderTo("viewer", {
    width: "100%",
    height: "100%",
    flow: "paginated",
    manager: "continuous",
    styles: {
        body: {
            "padding": "60px 50px !important", // เว้นขอบหน้ากระดาษ A5
            "font-family": "'Sarabun', sans-serif !important",
            "line-height": "1.8 !important", // ระยะบรรทัดให้อ่านง่าย
            "text-align": "justify !important" // จัดตัวหนังสือชิดขอบซ้ายขวาแบบเล่มนิยาย
        }
    }
});

// ตั้งค่า Dropdown
const toc = document.getElementById("toc");
episodes.forEach(ep => {
    const opt = document.createElement("option");
    opt.value = ep.file;
    opt.textContent = ep.name;
    if (ep.file === bookFile) opt.selected = true;
    toc.appendChild(opt);
});
toc.onchange = (e) => location.href = `reader.html?book=${encodeURIComponent(e.target.value)}&reset=true`;

// ปุ่มเลื่อนหน้า
document.getElementById("prev").onclick = () => rendition.prev();
document.getElementById("next").onclick = () => rendition.next();