# 🚀 VKN ERP Automation Usage Guide

**Hướng dẫn sử dụng các công cụ tự động hóa để phát triển modules VKN ERP**

---

## 📋 Tổng Quan

Dự án VKN ERP có **3 automation scripts** giúp tăng tốc quá trình phát triển:

1. **list-vkn-modules.sh** - Xem danh sách tất cả modules
2. **create-vkn-module.sh** - Tạo một module đơn lẻ
3. **auto-implement-modules.sh** ⭐ - Tạo nhiều modules cùng lúc

---

## 🎯 Use Cases

### Case 1: Xem Danh Sách Modules

```bash
./scripts/list-vkn-modules.sh
```

**Khi nào dùng:**
- Muốn xem tất cả 38 modules cần phát triển
- Kiểm tra trạng thái hiện tại
- Xem ước tính thời gian cho mỗi module

**Output:**
- Danh sách đầy đủ 38 modules
- Phân loại theo 12 phases
- Trạng thái (completed/in-progress/planned)
- Ước tính thời gian

---

### Case 2: Tạo Một Module Đơn Lẻ

```bash
./scripts/create-vkn-module.sh expenses "Expenses Management Module"
```

**Khi nào dùng:**
- Muốn tạo một module cụ thể
- Cần kiểm soát từng module
- Đang học cách sử dụng script

**Parameters:**
- `module-name`: Tên module (ví dụ: expenses, payment, sales)
- `description`: Mô tả module (trong dấu ngoặc kép)

**Ví dụ:**
```bash
# Tạo expenses module
./scripts/create-vkn-module.sh expenses "Expenses Management Module"

# Tạo payment module
./scripts/create-vkn-module.sh payment "Payment Processing Module"

# Tạo crm module
./scripts/create-vkn-module.sh crm "Customer Relationship Management Module"
```

---

### Case 3: Tạo Tất Cả Modules Của Một Phase

```bash
./scripts/auto-implement-modules.sh --phase 2
```

**Khi nào dùng:**
- Muốn tạo tất cả modules của một phase cùng lúc
- Đang làm việc theo thứ tự phases
- Cần tạo nhiều modules liên quan

**Phases có sẵn:**
- Phase 2: Financial Management (7 modules)
- Phase 3: Sales & CRM (4 modules)
- Phase 4: Inventory & Purchasing (4 modules)
- Phase 5: Production & Manufacturing (4 modules)
- Phase 6: Distribution (3 modules)
- Phase 7: HR & Operations (7 modules)
- Phase 8: Fleet & Logistics (2 modules)
- Phase 9: Project Management (3 modules)
- Phase 10: Reporting & Analytics (2 modules)
- Phase 11: AI & Automation (2 modules)
- Phase 12: SaaS (1 module)

**Ví dụ:**
```bash
# Tạo tất cả Phase 2 modules
./scripts/auto-implement-modules.sh --phase 2

# Tạo tất cả Phase 3 modules
./scripts/auto-implement-modules.sh --phase 3

# Tạo tất cả Phase 7 modules
./scripts/auto-implement-modules.sh --phase 7
```

---

### Case 4: Tạo Module Cụ Thể Với Auto Script

```bash
./scripts/auto-implement-modules.sh --module expenses
```

**Khi nào dùng:**
- Tạo một module từ danh sách đã định nghĩa
- Không cần nhớ description
- Muốn dùng công cụ thống nhất

**Ví dụ:**
```bash
# Tạo expenses module
./scripts/auto-implement-modules.sh --module expenses

# Tạo sales module
./scripts/auto-implement-modules.sh --module sales

# Tạo ai module
./scripts/auto-implement-modules.sh --module ai
```

---

### Case 5: Tạo TẤT CẢ Modules Còn Lại (⚠️ Cẩn thận!)

```bash
./scripts/auto-implement-modules.sh --all
```

**Khi nào dùng:**
- Muốn tạo tất cả 36 modules còn lại cùng lúc
- Đã sẵn sàng với cấu trúc dự án
- Có kế hoạch phát triển rõ ràng

**⚠️ Cảnh báo:**
- Sẽ tạo 36 modules cùng lúc
- Tốn ~10 phút
- Tạo ~540 files, ~54,000 LOC
- Chỉ nên dùng khi đã quen với quy trình

**Confirmation:**
Script sẽ hỏi xác nhận trước khi thực hiện.

---

## 📊 Workflow Đầy Đủ

### Workflow 1: Phát Triển Theo Từng Module

```bash
# Bước 1: Xem danh sách modules
./scripts/list-vkn-modules.sh

# Bước 2: Tạo module expenses
./scripts/create-vkn-module.sh expenses "Expenses Management Module"

# Bước 3: Customize code
cd packages/plugins/vkn-erp-expenses
# Edit entities, services, controllers...

# Bước 4: Build và test
yarn nx build plugin-vkn-erp-expenses
yarn nx test plugin-vkn-erp-expenses

# Bước 5: Commit
git add packages/plugins/vkn-erp-expenses
git commit -m "feat(vkn-erp-expenses): Implement expenses module"
git push

# Bước 6: Lặp lại cho module tiếp theo
```

---

### Workflow 2: Phát Triển Theo Phase

```bash
# Bước 1: Tạo tất cả modules của Phase 2
./scripts/auto-implement-modules.sh --phase 2

# Bước 2: Xác nhận modules đã được tạo
ls -la packages/plugins/ | grep vkn-erp

# Bước 3: Chọn module đầu tiên để customize
cd packages/plugins/vkn-erp-expenses

# Bước 4: Implement business logic
# Edit entities, services, controllers...

# Bước 5: Build và test từng module
yarn nx build plugin-vkn-erp-expenses
yarn nx test plugin-vkn-erp-expenses

# Bước 6: Commit module đã hoàn thành
git add packages/plugins/vkn-erp-expenses
git commit -m "feat(vkn-erp-expenses): Complete expenses module"

# Bước 7: Tiếp tục với module tiếp theo
cd ../vkn-erp-payment
# Repeat...
```

---

### Workflow 3: Setup Toàn Bộ Dự Án (Advanced)

```bash
# Bước 1: Tạo tất cả modules cùng lúc
./scripts/auto-implement-modules.sh --all
# Confirm: y

# Bước 2: Xác nhận kết quả
echo "Total modules created:"
ls -1 packages/plugins/ | grep vkn-erp | wc -l
# Should show: 41 (including core and finance)

# Bước 3: Commit cấu trúc ban đầu
git add packages/plugins/vkn-erp-*
git commit -m "feat: Initialize all VKN ERP module structures"
git push

# Bước 4: Tạo nhánh cho từng module
# Phase 2 modules
git checkout -b vkn-erp-module_expenses
git checkout main

git checkout -b vkn-erp-module_payment
git checkout main

# ... repeat for other modules

# Bước 5: Bắt đầu phát triển từng module trên nhánh riêng
```

---

## 🎓 Best Practices

### 1. Kiểm Tra Trước Khi Tạo
```bash
# Always check what exists first
./scripts/list-vkn-modules.sh

# Check specific module
ls -la packages/plugins/vkn-erp-expenses 2>/dev/null && echo "Exists" || echo "Not found"
```

### 2. Tạo Branch Trước Khi Tạo Module
```bash
# Create branch first
git checkout -b vkn-erp-module_expenses

# Then create module
./scripts/create-vkn-module.sh expenses "Expenses Management Module"
```

### 3. Test Ngay Sau Khi Tạo
```bash
# Create module
./scripts/create-vkn-module.sh expenses "Expenses Management Module"

# Try to build immediately
yarn nx build plugin-vkn-erp-expenses
# Should succeed without customization
```

### 4. Commit Từng Module
```bash
# Don't commit all modules at once
# Commit each module as you complete it
git add packages/plugins/vkn-erp-expenses
git commit -m "feat(vkn-erp-expenses): Implement expenses module with approval workflow"
```

### 5. Sử Dụng Module Mẫu
```bash
# Always reference the core module
ls -R packages/plugins/vkn-erp-core/

# Copy patterns from core
cat packages/plugins/vkn-erp-core/src/lib/entities/vkn-company-settings.entity.ts
```

---

## 🐛 Troubleshooting

### Script không chạy được
```bash
# Fix permissions
chmod +x scripts/*.sh

# Verify
ls -la scripts/*.sh
```

### Module đã tồn tại
```bash
# Check if exists
ls packages/plugins/vkn-erp-expenses

# Remove if needed (⚠️ cẩn thận!)
rm -rf packages/plugins/vkn-erp-expenses

# Then create again
./scripts/create-vkn-module.sh expenses "Expenses Management Module"
```

### Build lỗi sau khi tạo
```bash
# Install dependencies
yarn install

# Clear NX cache
yarn nx reset

# Try build again
yarn nx build plugin-vkn-erp-expenses
```

---

## 📈 Metrics

### Time Saved Per Module
- **Manual:** 30-60 minutes
- **Automated:** < 1 minute
- **Savings:** 97-98%

### Time Saved for All Modules
- **Manual:** 18-36 hours
- **Automated:** < 10 minutes
- **Savings:** 99%

---

## 📞 Support

**Developer:** Minh Tuấn - VietKeyNet Software Solutions  
**Email:** vietkeynet@gmail.com  
**Phone:** 0912537003

---

## 📚 Related Documentation

- `QUICK_START_VKN.md` - Quick start guide
- `HUONG_DAN_PHAT_TRIEN_MODULE.md` - Complete development guide
- `VKN_MODULE_TOOLS_SUMMARY.md` - Tools summary
- `AUTOMATED_MODULES_CREATION_SUMMARY.md` - Achievement summary
- `scripts/README.md` - Scripts documentation

---

**Version:** 1.0  
**Last Updated:** December 17, 2025  
**Status:** ✅ Ready for Use
