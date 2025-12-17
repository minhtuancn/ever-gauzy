#!/bin/bash

# VKN ERP Module List Script
# Displays all planned modules from the VKN ERP Comprehensive Strategy

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        VKN ERP Module Development Plan (38 Modules)           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${GREEN}✅ Phase 1: Core Module (COMPLETED - 100%)${NC}"
echo -e "   ${CYAN}Duration:${NC} 3 days | ${CYAN}Status:${NC} ✓ Complete"
echo -e "   1. ${GREEN}✓${NC} vkn-erp-core - Core business logic, settings"
echo ""

echo -e "${YELLOW}🚧 Phase 2: Financial Management (8 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 15-20 days | ${CYAN}Status:${NC} In Progress (10%)"
echo -e "   1. ${YELLOW}⚡${NC} vkn-erp-finance - General Ledger, COA, Journal Entries (5 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-expenses - Expense management, approval workflow (3 days)"
echo -e "   3. ${RED}☐${NC} vkn-erp-payment - Payment gateway, tracking, reconciliation (4 days)"
echo -e "   4. ${RED}☐${NC} vkn-erp-einvoice - E-invoice Vietnam, tax authority integration (4 days)"
echo -e "   5. ${RED}☐${NC} vkn-erp-pricing - Price lists, discounts, promotions (3 days)"
echo -e "   6. ${RED}☐${NC} vkn-erp-tax - VAT handling, tax reports, compliance (3 days)"
echo -e "   7. ${RED}☐${NC} vkn-erp-bank - Bank integration, reconciliation (4 days)"
echo -e "   8. ${RED}☐${NC} vkn-erp-financial-reporting - Custom reports, dashboards (4 days)"
echo ""

echo -e "${CYAN}⏳ Phase 3: Sales & CRM (4 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 12-15 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-sales - Sales orders, quotes, invoices (4 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-crm - Customer relationship management (3 days)"
echo -e "   3. ${RED}☐${NC} vkn-erp-contacts - Contact management (3 days)"
echo -e "   4. ${RED}☐${NC} vkn-erp-contracts - Contract management, renewals (3 days)"
echo ""

echo -e "${CYAN}⏳ Phase 4: Inventory & Purchasing (4 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 15-18 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-purchasing - Purchase orders, vendors (4 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-inventory - Stock management, valuations (5 days)"
echo -e "   3. ${RED}☐${NC} vkn-erp-warehouse - Warehouse management, bin management (5 days)"
echo -e "   4. ${RED}☐${NC} vkn-erp-assets - Fixed assets management (3 days)"
echo ""

echo -e "${CYAN}⏳ Phase 5: Production & Manufacturing (4 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 16-20 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-production - BOM, work orders, manufacturing (5 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-agriculture - Agricultural operations (4 days)"
echo -e "   3. ${RED}☐${NC} vkn-erp-farm - Farm management (4 days)"
echo -e "   4. ${RED}☐${NC} vkn-erp-weighing - Weighing station management (4 days)"
echo ""

echo -e "${CYAN}⏳ Phase 6: Distribution (3 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 12-15 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-dms - Distribution management, route planning (5 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-stores - Store management (4 days)"
echo -e "   3. ${RED}☐${NC} vkn-erp-pos - Point of Sale, offline mode (5 days)"
echo ""

echo -e "${CYAN}⏳ Phase 7: HR & Operations (7 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 18-22 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-hr - HR management (3 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-attendance - Biometric integration (4 days)"
echo -e "   3. ${RED}☐${NC} vkn-erp-leave - Leave management (2 days)"
echo -e "   4. ${RED}☐${NC} vkn-erp-payroll - Payroll calculations, tax (4 days)"
echo -e "   5. ${RED}☐${NC} vkn-erp-recruitment - Recruitment management (3 days)"
echo -e "   6. ${RED}☐${NC} vkn-erp-training - Training management (2 days)"
echo -e "   7. ${RED}☐${NC} vkn-erp-performance - Performance evaluation (3 days)"
echo ""

echo -e "${CYAN}⏳ Phase 8: Fleet & Logistics (2 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 8-10 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-fleet - Fleet management, GPS (5 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-logistics - Logistics management (4 days)"
echo ""

echo -e "${CYAN}⏳ Phase 9: Project Management (3 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 9-12 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-tasks - Task management (3 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-kanban - Kanban boards (3 days)"
echo -e "   3. ${RED}☐${NC} vkn-erp-workflow - Workflow engine (5 days)"
echo ""

echo -e "${CYAN}⏳ Phase 10: Reporting & Analytics (2 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 10-12 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-reporting - Report builder (6 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-reports - Standard reports (5 days)"
echo ""

echo -e "${CYAN}⏳ Phase 11: AI & Automation (2 modules)${NC}"
echo -e "   ${CYAN}Duration:${NC} 10-14 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-ai - ML integration, OCR (7 days)"
echo -e "   2. ${RED}☐${NC} vkn-erp-chat - Real-time chat, WebSocket (5 days)"
echo ""

echo -e "${CYAN}⏳ Phase 12: SaaS (1 module)${NC}"
echo -e "   ${CYAN}Duration:${NC} 6-8 days"
echo -e "   1. ${RED}☐${NC} vkn-erp-saas - Multi-tenant, subscription billing (7 days)"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}Summary:${NC}"
echo -e "  ${GREEN}✓ Completed:${NC} 1 module (Phase 1)"
echo -e "  ${YELLOW}⚡ In Progress:${NC} 1 module (Phase 2.1 - Finance)"
echo -e "  ${RED}☐ Remaining:${NC} 36 modules"
echo -e "  ${CYAN}Total:${NC} 38 modules"
echo ""
echo -e "  ${CYAN}Estimated Timeline:${NC} 4-6 months (full-time development)"
echo -e "  ${CYAN}Current Progress:${NC} ~5% (2/38 modules started)"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo ""

# Check if module name is provided for quick creation
if [ ! -z "$1" ]; then
    MODULE_NAME=$1
    echo -e "${YELLOW}Want to create module '${MODULE_NAME}'?${NC}"
    echo -e "Run: ${GREEN}./scripts/create-vkn-module.sh ${MODULE_NAME} \"Module Description\"${NC}"
    echo ""
fi

echo -e "${CYAN}📚 Documentation:${NC}"
echo -e "  • VKN_ERP_COMPREHENSIVE_STRATEGY.md - Full strategy document"
echo -e "  • VKN_ERP_IMPLEMENTATION_GUIDE.md - Implementation guide"
echo -e "  • HUONG_DAN_PHAT_TRIEN_MODULE.md - Module development guide (Vietnamese)"
echo -e "  • BRANCHING_STRATEGY.md - Git branching strategy"
echo ""

echo -e "${CYAN}🚀 Quick Start:${NC}"
echo -e "  • List modules: ${GREEN}./scripts/list-vkn-modules.sh${NC}"
echo -e "  • Create module: ${GREEN}./scripts/create-vkn-module.sh <name> \"<description>\"${NC}"
echo -e "  • Read guide: ${GREEN}cat HUONG_DAN_PHAT_TRIEN_MODULE.md${NC}"
echo ""
