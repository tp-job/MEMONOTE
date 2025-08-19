Software Requirements Specification
ชื่อเอกสาร: Software Requirements Specification (SRS)
Project: Note Website (Frontend Only)
Technology: React + TailwindCSS + LocalStorage
Author: Theeranat Phutiwanich (Job)
วันที่สร้าง: 18 สิงหาคม 2568
1.	บทนำ (Introduction)
1.1 วัตถุประสงค์ (Purpose)
ระบบนี้เป็นเว็บแอปพลิเคชันสำหรับจดบันทึก (Note App) โดยทำงานบนฝั่ง Frontend เท่านั้น ผู้ใช้สามารถเพิ่ม แก้ไข ลบ และค้นหาบันทึกได้ โดยข้อมูลทั้งหมดจะถูกเก็บไว้ใน LocalStorage ของ browser
1.2 ขอบเขต (Scope)
ผู้ใช้: บุคคลทั่วไปที่ต้องการแอปจดบันทึกอย่างง่าย
ระบบ:
จัดการบันทึก (Note CRUD)
ค้นหาและกรองโน้ต
รองรับการปักหมุด/แท็กโน้ต (Optional)
บันทึกข้อมูลอัตโนมัติลง LocalStorage
ข้อจำกัด: ไม่มีการเชื่อมต่อฐานข้อมูลหรือ backend
1.3 คำจำกัดความ (Definitions)
Note: ข้อมูลที่ผู้ใช้บันทึก ประกอบด้วย Title + Content (+ Tag)
LocalStorage: API สำหรับเก็บข้อมูลฝั่ง client
2.	ฟังก์ชันการทำงาน (Functional Requirements)
2.1 Core Features
สร้าง Note: ผู้ใช้สามารถสร้างโน้ตใหม่ (Title + Content)
แก้ไข Note: ผู้ใช้สามารถแก้ไข Title / Content ของโน้ต
ลบ Note: ผู้ใช้สามารถลบโน้ตได้
แสดงรายการ Note: ระบบแสดงผลโน้ตทั้งหมดในรูปแบบ Card/Grid
ค้นหา Note: ผู้ใช้สามารถค้นหาจาก Title หรือ Content
บันทึกลง LocalStorage: ทุกครั้งที่เพิ่ม/แก้ไข/ลบ ข้อมูลจะ sync เข้าสู่ LocalStorage
2.2 Optional Features
การปักหมุดโน้ต (Pin Note)
การใส่แท็ก (Tag)
Dark/Light Mode
Export/Import ข้อมูล
3.	ข้อกำหนดที่ไม่ใช่ฟังก์ชัน (Non-functional Requirements)
Usability: UI ใช้งานง่าย รองรับมือถือ (Responsive)
Performance: โหลดเร็วเพราะเป็น client-only app
Reliability: ข้อมูลไม่หายแม้ปิด browser (ยกเว้นผู้ใช้ลบ LocalStorage)
Maintainability: โครงสร้าง React แยก component ชัดเจน
Portability: ทำงานได้ทุก browser ที่รองรับ LocalStorage
4.	สถาปัตยกรรมระบบ (System Architecture)
Frontend: React + TailwindCSS
Data Storage: LocalStorage (JSON format)
โครงสร้าง Component:
App.jsx → Root
NotesPage.jsx → แสดงโน้ตทั้งหมด
NoteCard.jsx → Card ของโน้ต
NoteForm.jsx → ฟอร์มเพิ่ม/แก้ไข
SearchBar.jsx → ช่องค้นหา
useLocalStorage.js → Hook สำหรับจัดการ LocalStorage
5.	Use Case Diagram
ผู้ใช้ (User) สามารถ:
สร้าง note
ดู note
แก้ไข note
ลบ note
ค้นหา note
6.	แผนการพัฒนา (Development Plan)
1 สร้าง UI + React Component
2 เชื่อม useState + LocalStorage
3 เพิ่ม Search & Filter
4 (Optional) Tagging, Pin, Export/Import
5 ปรับ UI Responsive
7.	การทดสอบ (Testing)
Unit test: การเพิ่ม/ลบ/แก้ไข note
Integration test: ตรวจสอบการ sync ข้อมูลกับ LocalStorage
UI test: Responsive บนมือถือและ desktop


