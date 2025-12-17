# 📚 Hướng Dẫn Sử Dụng Repository Tham Khảo

**Repository:** https://github.com/minhtuancn/vietkeynet-erp-reference  
**Mục đích:** Tham khảo business logic và tính năng cho migration  
**Ngày:** 16/12/2025

---

## 🎯 QUAN TRỌNG

> **Toàn bộ các module và tính năng được lấy theo nội dung từ repository này:**
> https://github.com/minhtuancn/vietkeynet-erp-reference

Đây là hệ thống ERP gốc của Vietkeynet với:
- ✅ 72+ modules hoàn chỉnh
- ✅ React 19 + TypeScript frontend
- ✅ Express.js backend
- ✅ Production ready v1.0.4
- ✅ 409+ components
- ✅ 2,866+ i18n keys
- ✅ RBAC: 16 roles, 560+ permissions

---

## 📂 CẤU TRÚC REPOSITORY

### Backend Structure
```
backend/src/
├── routes/              # 39 API route files
│   ├── accounting.js    # Kế toán tổng hợp (48KB)
│   ├── analytics.js     # Phân tích dữ liệu (36KB)
│   ├── auth.js          # Xác thực (19KB)
│   ├── chat.js          # Chat & AI (28KB)
│   ├── contacts.js      # Liên hệ (31KB)
│   ├── crm.js           # CRM (32KB)
│   ├── dashboard.js     # Dashboard (14KB)
│   ├── delivery.js      # Giao hàng (35KB)
│   ├── e-invoice.js     # Hóa đơn điện tử (40KB)
│   ├── fleet.js         # Quản lý xe (27KB)
│   ├── helpdesk.js      # Hỗ trợ (28KB)
│   ├── hr.js            # Nhân sự (29KB)
│   ├── integrations.js  # Tích hợp (24KB)
│   ├── inventory.js     # Kho hàng (40KB)
│   ├── notifications.js # Thông báo (16KB)
│   ├── payments.js      # Thanh toán (8KB)
│   ├── pos.js           # POS (31KB)
│   ├── production.js    # Sản xuất (41KB)
│   ├── products.js      # Sản phẩm (12KB)
│   ├── purchasing.js    # Mua hàng (23KB)
│   ├── reports.js       # Báo cáo (23KB)
│   ├── sales.js         # Bán hàng (19KB)
│   ├── tenants.js       # Multi-tenant (21KB)
│   ├── time-tracking.js # Chấm công (22KB)
│   ├── todos.js         # Công việc (13KB)
│   ├── warehouse.js     # Kho (21KB)
│   ├── weighing.js      # Cân đo (23KB)
│   ├── workflows.js     # Quy trình (27KB)
│   └── ... (12+ routes khác)
├── services/            # Business logic services
├── middleware/          # Authentication, validation
├── db/                  # Database connection & queries
└── utils/               # Helper functions
```

### Frontend Structure
```
src/
├── pages/              # React pages cho từng module
├── components/         # 409+ React components
├── i18n/              # 2,866+ translation keys (vi/en/zh)
├── lib/               # Utilities & helpers
└── types/             # TypeScript types
```

### Documentation
```
backend/
├── README.md                              # Overview
├── DATABASE_SCHEMA.md                     # Schema chi tiết (113KB)
├── API_DOCUMENTATION.md                   # API docs (14KB)
├── RBAC_SECURITY_GUIDELINES.md           # RBAC guide (24KB)
├── FRONTEND_INTEGRATION.md               # Frontend guide (13KB)
└── PHASE_1_BACKEND_COMPLETE.md           # Backend completion
```

---

## 🔍 CÁCH SỬ DỤNG CHO TỪNG MODULE

### Ví dụ: Finance Module

#### Bước 1: Clone repository tham khảo
```bash
cd /tmp
git clone https://github.com/minhtuancn/vietkeynet-erp-reference.git
cd vietkeynet-erp-reference
```

#### Bước 2: Xem backend implementation
```bash
# Đọc accounting route (tương đương Finance Module)
cat backend/src/routes/accounting.js
```

**Nội dung accounting.js (48KB):**
- Chart of Accounts endpoints
- Journal Entry CRUD
- General Ledger operations
- Financial reports (Balance Sheet, P&L, Cash Flow)
- Budget management
- Fiscal period management
- Multi-currency support

#### Bước 3: Hiểu database schema
```bash
# Xem schema
cat backend/DATABASE_SCHEMA.md | grep -A 50 "accounts"
```

**Tables liên quan:**
- `accounts` - Chart of accounts
- `journal_entries` - Bút toán
- `journal_entry_lines` - Chi tiết bút toán
- `fiscal_periods` - Kỳ kế toán
- `budgets` - Ngân sách
- `account_balances` - Số dư tài khoản

#### Bước 4: Xem frontend implementation
```bash
# Xem React pages
ls -la src/pages/ | grep -i accounting
```

#### Bước 5: Extract business logic

**Ví dụ từ accounting.js:**

```javascript
// POST /api/accounting/journal-entries
// Tạo bút toán mới
router.post('/journal-entries', async (req, res) => {
  const { date, reference, narration, lines } = req.body;
  
  // Validation
  if (!lines || lines.length < 2) {
    return res.status(400).json({ 
      error: 'At least 2 lines required' 
    });
  }
  
  // Kiểm tra balance
  const totalDebit = lines.reduce((sum, line) => 
    sum + (line.debit || 0), 0
  );
  const totalCredit = lines.reduce((sum, line) => 
    sum + (line.credit || 0), 0
  );
  
  if (totalDebit !== totalCredit) {
    return res.status(400).json({ 
      error: 'Debit and credit must be equal' 
    });
  }
  
  // Create journal entry...
});
```

**Migrate sang NestJS:**

```typescript
// vkn-journal-entry.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VknJournalEntryService } from '../services/vkn-journal-entry.service';
import { CreateJournalEntryDto } from '../dto/journal-entry.dto';

@ApiTags('VKN ERP Finance - Journal Entries')
@Controller('vkn-erp/finance/journal-entries')
export class VknJournalEntryController {
  constructor(
    private readonly journalEntryService: VknJournalEntryService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create journal entry' })
  async create(@Body() dto: CreateJournalEntryDto) {
    // Same business logic as reference
    if (dto.lines.length < 2) {
      throw new BadRequestException('At least 2 lines required');
    }
    
    const totalDebit = dto.lines.reduce((sum, line) => 
      sum + (line.debit || 0), 0
    );
    const totalCredit = dto.lines.reduce((sum, line) => 
      sum + (line.credit || 0), 0
    );
    
    if (totalDebit !== totalCredit) {
      throw new BadRequestException('Debit and credit must be equal');
    }
    
    return this.journalEntryService.create(dto);
  }
}
```

---

## 📋 CHECKLIST CHO TỪNG MODULE

### Khi bắt đầu module mới:

- [ ] **1. Tham khảo backend route**
  ```bash
  cat backend/src/routes/{module-name}.js
  ```
  - Xem tất cả endpoints
  - Hiểu business logic
  - Note validation rules

- [ ] **2. Xem database schema**
  ```bash
  cat backend/DATABASE_SCHEMA.md | grep -A 100 "{table-name}"
  ```
  - Xác định tables cần tạo
  - Hiểu relationships
  - Note indexes và constraints

- [ ] **3. Xem frontend pages**
  ```bash
  ls -la src/pages/ | grep -i {module-name}
  ```
  - Hiểu UI/UX requirements
  - Xem forms và validations
  - Note user workflows

- [ ] **4. Đọc documentation**
  ```bash
  cat backend/README.md
  cat backend/API_DOCUMENTATION.md
  ```
  - Hiểu tổng quan
  - Xem API patterns
  - Note authentication/authorization

- [ ] **5. Extract requirements**
  - List all entities cần tạo
  - List all services cần implement
  - List all endpoints cần build
  - List all business rules
  - List all validations

- [ ] **6. Plan migration**
  - Map Express routes → NestJS controllers
  - Map Sequelize/MySQL → TypeORM
  - Map React components → Angular components
  - Adapt to Ever Gauzy plugin architecture

---

## 🎯 MAPPING GUIDE

### Backend: Express → NestJS

| Express | NestJS |
|---------|--------|
| `router.get()` | `@Get()` |
| `router.post()` | `@Post()` |
| `router.put()` | `@Put()` |
| `router.delete()` | `@Delete()` |
| `req.body` | `@Body()` |
| `req.params` | `@Param()` |
| `req.query` | `@Query()` |
| `res.status().json()` | `return` / `throw` |
| Middleware | `@UseGuards()`, `@UseInterceptors()` |

### Database: MySQL → TypeORM

| MySQL/Sequelize | TypeORM |
|-----------------|---------|
| `connection.query()` | `repository.find()` |
| `Model.findAll()` | `repository.find()` |
| `Model.findOne()` | `repository.findOne()` |
| `Model.create()` | `repository.save()` |
| `Model.update()` | `repository.update()` |
| `Model.destroy()` | `repository.delete()` |
| `INNER JOIN` | `relations: []` |

### Frontend: React → Angular

| React | Angular |
|-------|---------|
| `useState()` | Component properties |
| `useEffect()` | `ngOnInit()`, `ngOnDestroy()` |
| `useContext()` | Services (DI) |
| `props` | `@Input()` |
| `onClick` | `(click)` |
| `onChange` | `(change)`, `[(ngModel)]` |
| JSX | HTML templates |
| CSS Modules | Component styles |

---

## 📖 EXAMPLES

### Example 1: Accounts Entity

**Reference (MySQL):**
```javascript
// From backend/src/routes/accounting.js
CREATE TABLE accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  type ENUM('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'),
  parent_id INT,
  balance DECIMAL(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  tenant_id INT NOT NULL
);
```

**Migration (TypeORM):**
```typescript
// vkn-account.entity.ts
import { Entity, Column } from 'typeorm';
import { TenantOrganizationBaseEntity } from '@gauzy/core';

// Define enum
export enum AccountType {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE'
}

@Entity('vkn_accounts')
export class VknAccount extends TenantOrganizationBaseEntity {
  @Column({ length: 20, unique: true })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ 
    type: 'enum', 
    enum: AccountType
  })
  type: AccountType;

  @Column({ nullable: true })
  parentId: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ default: true })
  isActive: boolean;
}
```

### Example 2: Journal Entry Validation

**Reference (Express):**
```javascript
// From backend/src/routes/accounting.js
const validateJournalEntry = (entry) => {
  if (!entry.lines || entry.lines.length < 2) {
    throw new Error('At least 2 lines required');
  }
  
  const debit = entry.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
  const credit = entry.lines.reduce((sum, l) => sum + (l.credit || 0), 0);
  
  if (Math.abs(debit - credit) > 0.01) {
    throw new Error('Entry must be balanced');
  }
};
```

**Migration (NestJS):**
```typescript
// vkn-journal-entry.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJournalEntryDto } from '../dto/journal-entry.dto';
import { VknJournalEntry } from '../entities/vkn-journal-entry.entity';

@Injectable()
export class VknJournalEntryService {
  constructor(
    @InjectRepository(VknJournalEntry)
    private readonly repository: Repository<VknJournalEntry>
  ) {}

  private validateEntry(dto: CreateJournalEntryDto): void {
    if (!dto.lines || dto.lines.length < 2) {
      throw new BadRequestException('At least 2 lines required');
    }
    
    const debit = dto.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
    const credit = dto.lines.reduce((sum, l) => sum + (l.credit || 0), 0);
    
    if (Math.abs(debit - credit) > 0.01) {
      throw new BadRequestException('Entry must be balanced');
    }
  }

  async create(dto: CreateJournalEntryDto) {
    this.validateEntry(dto);
    // Create journal entry...
    return this.repository.save(dto);
  }
}
```

---

## 🔧 TOOLS & COMMANDS

### Clone reference repo
```bash
cd /tmp
git clone https://github.com/minhtuancn/vietkeynet-erp-reference.git
```

### Search for specific feature
```bash
cd vietkeynet-erp-reference
grep -r "journal entry" backend/src/routes/
grep -r "Chart of Accounts" backend/src/routes/
```

### View database schema
```bash
cat backend/DATABASE_SCHEMA.md | less
```

### List all routes
```bash
ls -la backend/src/routes/
```

### View API documentation
```bash
cat backend/API_DOCUMENTATION.md
```

### Check RBAC permissions
```bash
cat backend/RBAC_SECURITY_GUIDELINES.md
```

---

## 💡 TIPS

### DO ✅

1. **Clone locally** - Clone reference repo để dễ tham khảo
2. **Read code** - Đọc kỹ implementation code
3. **Understand business logic** - Hiểu logic trước khi code
4. **Keep same features** - Giữ nguyên tính năng
5. **Adapt architecture** - Adapt cho Ever Gauzy
6. **Test thoroughly** - Test kỹ sau khi migrate

### DON'T ❌

1. **Don't copy-paste** - Không copy trực tiếp (khác stack)
2. **Don't skip validation** - Không bỏ qua validation rules
3. **Don't change business logic** - Không thay đổi logic
4. **Don't forget RBAC** - Không quên permissions
5. **Don't ignore edge cases** - Không bỏ edge cases

---

## 📞 SUPPORT

### Khi gặp vấn đề:

1. **Tham khảo reference repo** trước
2. **Đọc documentation** trong backend/
3. **Xem similar modules** đã implement
4. **Check Core Module** đã hoàn thành

### Resources:

- **Reference Repo:** https://github.com/minhtuancn/vietkeynet-erp-reference
- **Core Module:** `packages/plugins/vkn-erp-core/`
- **Documentation:** `HUONG_DAN_TRIEN_KHAI.md`
- **Roadmap:** `ROADMAP_SUMMARY.md`

---

**Người tạo:** GitHub Copilot Agent  
**Ngày:** 16/12/2025  
**Status:** 📚 Reference Guide Ready
