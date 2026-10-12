# Agent Instructions

## Google Drive Build 交付規範（所有 Agent 必須遵守）
- **目的地固定**：Google Drive `AI Project/typescript-config/`（此資料夾名稱必須等於 GitHub Repository 名稱；AI Project 根目錄 ID `1Yhfro6Ss5TSCXCVIZIHEu5h7V1gL8b27`）。每個 Git 專案獨立資料夾，禁止把 Build 散放在 AI Project 根目錄。
- **最新的完整 Build 直接放在專案根目錄**：包含 ZIP／EXE 包、SHA-256、全部分片、必要的還原／安裝腳本與說明，可多平台最新檔並存；先 Build 與測試成功，核對上傳後檔名、parent、大小及 checksum。缺 ZIP 或缺分片的版本不完整，不取代舊版。
- **僅有重大功能、架構、相容性或美術差異時才另建 `vX.Y.Z-說明/` 子資料夾**；一般舊版移到 `歷史封存/`，非破壞性保留，不要每次小更新都建立版本資料夾。
- 所有新開發提交 GitHub；昂貴 Actions Build 以 `workflow_dispatch` 或正式 `release: published` 受控執行，不隨每次 push main 自動觸發。交付時回報 Drive 專案資料夾、版本、內容、checksum 與驗證狀態。
**For Codex:** Put latest verified complete builds directly at `AI Project/typescript-config/`; milestone-only version folders, archive routine prior builds, never promote incomplete uploads.
