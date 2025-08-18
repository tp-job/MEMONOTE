``` csharp
note-app/
│── public/                       # ไฟล์ static (favicon, index.html)
│
│── src/
│   ├── assets/                   # เก็บรูปภาพ ไอคอน หรือไฟล์ static อื่น ๆ
│   │   └── logo.svg
│   │
│   ├── components/               # React Components ที่นำกลับมาใช้ได้
│   │   ├── NoteCard.jsx          # แสดงโน้ตแต่ละใบ
│   │   ├── NoteForm.jsx          # ฟอร์มสร้าง/แก้ไขโน้ต
│   │   ├── SearchBar.jsx         # ช่องค้นหาโน้ต
│   │   └── Header.jsx            # แถบหัวเว็บ (ชื่อแอป + ปุ่มเพิ่ม Note)
│   │
│   ├── hooks/                    # Custom Hooks
│   │   └── useLocalStorage.js    # จัดการ LocalStorage (CRUD)
│   │
│   ├── pages/                    # แยกแต่ละหน้า
│   │   └── NotesPage.jsx         # หน้าแสดงบันทึกทั้งหมด
│   │
│   ├── utils/                    # Helper functions
│   │   └── dateFormat.js         # ฟังก์ชัน format วันที่
│   │
│   ├── App.jsx                   # Component หลัก
│   ├── main.jsx                  # Entry point ของ React (render)
│   └── index.css                 # Global CSS + Tailwind base
│
│── .gitignore
│── package.json
│── tailwind.config.js            # config tailwind
│── postcss.config.js             # ใช้คู่กับ tailwind
│── vite.config.js                # config ของ Vite


```