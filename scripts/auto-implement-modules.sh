#!/bin/bash

# VKN ERP Automated Module Implementation Script
# This script automatically creates modules sequentially based on the VKN ERP strategy
# Usage: ./scripts/auto-implement-modules.sh [--phase <phase-number>] [--module <module-name>]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║    VKN ERP Automated Module Implementation Engine              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Define all modules with their descriptions and complexity
declare -A PHASE_2_MODULES=(
    ["expenses"]="Expenses Management Module|3|medium"
    ["payment"]="Payment Processing Module|4|high"
    ["pricing"]="Price Lists and Discounts Module|3|medium"
    ["tax"]="Tax Management Module|3|medium"
    ["einvoice"]="E-Invoice Vietnam Module|4|high"
    ["bank"]="Bank Integration Module|4|high"
    ["financial-reporting"]="Financial Reporting Module|4|high"
)

declare -A PHASE_3_MODULES=(
    ["sales"]="Sales Orders and Quotes Module|4|high"
    ["crm"]="Customer Relationship Management Module|3|medium"
    ["contacts"]="Contact Management Module|3|low"
    ["contracts"]="Contract Management Module|3|medium"
)

declare -A PHASE_4_MODULES=(
    ["purchasing"]="Purchase Orders Module|4|medium"
    ["inventory"]="Inventory Management Module|5|high"
    ["warehouse"]="Warehouse Management Module|5|high"
    ["assets"]="Fixed Assets Module|3|medium"
)

declare -A PHASE_5_MODULES=(
    ["production"]="Production Management Module|5|high"
    ["agriculture"]="Agricultural Operations Module|4|medium"
    ["farm"]="Farm Management Module|4|medium"
    ["weighing"]="Weighing Station Module|4|medium"
)

declare -A PHASE_6_MODULES=(
    ["dms"]="Distribution Management System Module|5|high"
    ["stores"]="Store Management Module|4|medium"
    ["pos"]="Point of Sale Module|5|high"
)

declare -A PHASE_7_MODULES=(
    ["hr"]="HR Management Module|3|medium"
    ["attendance"]="Attendance Management Module|4|medium"
    ["leave"]="Leave Management Module|2|low"
    ["payroll"]="Payroll Module|4|high"
    ["recruitment"]="Recruitment Module|3|medium"
    ["training"]="Training Management Module|2|low"
    ["performance"]="Performance Evaluation Module|3|medium"
)

declare -A PHASE_8_MODULES=(
    ["fleet"]="Fleet Management Module|5|high"
    ["logistics"]="Logistics Management Module|4|medium"
)

declare -A PHASE_9_MODULES=(
    ["tasks"]="Task Management Module|3|medium"
    ["kanban"]="Kanban Board Module|3|medium"
    ["workflow"]="Workflow Engine Module|5|high"
)

declare -A PHASE_10_MODULES=(
    ["reporting"]="Report Builder Module|6|high"
    ["reports"]="Standard Reports Module|5|high"
)

declare -A PHASE_11_MODULES=(
    ["ai"]="AI and ML Integration Module|7|high"
    ["chat"]="Real-time Chat Module|5|high"
)

declare -A PHASE_12_MODULES=(
    ["saas"]="SaaS and Multi-tenancy Module|7|high"
)

# Function to create a single module
create_module() {
    local module_name=$1
    local module_desc=$2
    local days=$3
    local complexity=$4
    
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}Creating Module: ${YELLOW}vkn-erp-${module_name}${NC}"
    echo -e "${CYAN}Description: ${NC}${module_desc}"
    echo -e "${CYAN}Estimated Time: ${NC}${days} days | ${CYAN}Complexity: ${NC}${complexity}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Check if module already exists
    if [ -d "${ROOT_DIR}/packages/plugins/vkn-erp-${module_name}" ]; then
        echo -e "${YELLOW}⚠ Module vkn-erp-${module_name} already exists. Skipping...${NC}"
        echo ""
        return 0
    fi
    
    # Run the create script
    echo -e "${BLUE}▶ Running module creation script...${NC}"
    if "${SCRIPT_DIR}/create-vkn-module.sh" "${module_name}" "${module_desc}" <<< "y"; then
        echo -e "${GREEN}✓ Module vkn-erp-${module_name} created successfully${NC}"
        echo ""
        return 0
    else
        echo -e "${RED}✗ Failed to create module vkn-erp-${module_name}${NC}"
        echo ""
        return 1
    fi
}

# Function to create modules for a specific phase
create_phase_modules() {
    local phase=$1
    local -n modules=$2
    
    echo -e "${MAGENTA}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${MAGENTA}║ Phase ${phase}: Creating ${#modules[@]} modules${NC}"
    echo -e "${MAGENTA}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    local success_count=0
    local skip_count=0
    local fail_count=0
    
    for module_name in "${!modules[@]}"; do
        IFS='|' read -r desc days complexity <<< "${modules[$module_name]}"
        
        if create_module "$module_name" "$desc" "$days" "$complexity"; then
            if [ -d "${ROOT_DIR}/packages/plugins/vkn-erp-${module_name}" ]; then
                # Check if it was just created or already existed
                if [ -f "${ROOT_DIR}/packages/plugins/vkn-erp-${module_name}/CHANGELOG.md" ]; then
                    first_line=$(head -n 1 "${ROOT_DIR}/packages/plugins/vkn-erp-${module_name}/CHANGELOG.md")
                    if [[ "$first_line" == *"$(date +%Y-%m-%d)"* ]]; then
                        ((success_count++))
                    else
                        ((skip_count++))
                    fi
                else
                    ((success_count++))
                fi
            else
                ((skip_count++))
            fi
        else
            ((fail_count++))
        fi
        
        # Add a small delay between module creations
        sleep 1
    done
    
    echo -e "${MAGENTA}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✓ Created: ${success_count}${NC} | ${YELLOW}⊙ Skipped: ${skip_count}${NC} | ${RED}✗ Failed: ${fail_count}${NC}"
    echo -e "${MAGENTA}════════════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Function to display help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --phase <number>      Create all modules for a specific phase (2-12)"
    echo "  --module <name>       Create a specific module by name"
    echo "  --all                 Create all remaining modules (Phase 2-12)"
    echo "  --help                Display this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --phase 2          # Create all Phase 2 modules"
    echo "  $0 --module expenses  # Create only the expenses module"
    echo "  $0 --all              # Create all modules"
    echo ""
}

# Main logic
if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

case "$1" in
    --phase)
        if [ -z "$2" ]; then
            echo -e "${RED}Error: Phase number required${NC}"
            show_help
            exit 1
        fi
        
        case "$2" in
            2)
                create_phase_modules 2 PHASE_2_MODULES
                ;;
            3)
                create_phase_modules 3 PHASE_3_MODULES
                ;;
            4)
                create_phase_modules 4 PHASE_4_MODULES
                ;;
            5)
                create_phase_modules 5 PHASE_5_MODULES
                ;;
            6)
                create_phase_modules 6 PHASE_6_MODULES
                ;;
            7)
                create_phase_modules 7 PHASE_7_MODULES
                ;;
            8)
                create_phase_modules 8 PHASE_8_MODULES
                ;;
            9)
                create_phase_modules 9 PHASE_9_MODULES
                ;;
            10)
                create_phase_modules 10 PHASE_10_MODULES
                ;;
            11)
                create_phase_modules 11 PHASE_11_MODULES
                ;;
            12)
                create_phase_modules 12 PHASE_12_MODULES
                ;;
            *)
                echo -e "${RED}Error: Invalid phase number. Must be 2-12${NC}"
                exit 1
                ;;
        esac
        ;;
    
    --module)
        if [ -z "$2" ]; then
            echo -e "${RED}Error: Module name required${NC}"
            show_help
            exit 1
        fi
        
        module_name="$2"
        found=false
        
        # Search for module in all phases
        for phase_var in PHASE_{2..12}_MODULES; do
            declare -n current_phase=$phase_var
            if [ -n "${current_phase[$module_name]}" ]; then
                IFS='|' read -r desc days complexity <<< "${current_phase[$module_name]}"
                create_module "$module_name" "$desc" "$days" "$complexity"
                found=true
                break
            fi
        done
        
        if [ "$found" = false ]; then
            echo -e "${RED}Error: Module '${module_name}' not found in any phase${NC}"
            exit 1
        fi
        ;;
    
    --all)
        echo -e "${MAGENTA}╔════════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${MAGENTA}║        Creating ALL Remaining Modules (Phases 2-12)           ║${NC}"
        echo -e "${MAGENTA}╚════════════════════════════════════════════════════════════════╝${NC}"
        echo ""
        
        read -p "This will create all 36 remaining modules. Continue? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}Cancelled${NC}"
            exit 0
        fi
        
        for phase in {2..12}; do
            phase_var="PHASE_${phase}_MODULES"
            create_phase_modules $phase $phase_var
        done
        
        echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║            All Modules Creation Complete!                      ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
        ;;
    
    --help)
        show_help
        ;;
    
    *)
        echo -e "${RED}Error: Unknown option '$1'${NC}"
        show_help
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Next Steps:${NC}"
echo -e "  1. Review generated modules in packages/plugins/"
echo -e "  2. Customize entities, services, and controllers"
echo -e "  3. Build: ${CYAN}yarn nx build plugin-vkn-erp-<module>${NC}"
echo -e "  4. Test: ${CYAN}yarn nx test plugin-vkn-erp-<module>${NC}"
echo -e "  5. Commit your changes"
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo -e "  • QUICK_START_VKN.md - Quick reference guide"
echo -e "  • HUONG_DAN_PHAT_TRIEN_MODULE.md - Detailed development guide"
echo -e "  • VKN_MODULE_TOOLS_SUMMARY.md - Tools overview"
echo ""
