/**
 * ERPNext Printing Enhancement Script
 * 
 * This script enhances native printing functionality in ERPNext Desktop.
 * It intercepts print requests and provides native OS printing capabilities.
 * 
 * Features:
 * - Silent printing for thermal/receipt printers
 * - Custom printer selection
 * - PDF export
 * - Page size customization
 */

(function() {
  'use strict';

  // Check if running in Electron
  if (!window.electronAPI) {
    console.log('Not running in Electron - native print enhancements disabled');
    return;
  }

  // Add custom print button to ERPNext print view
  function addElectronPrintButton() {
    // Wait for ERPNext to load
    const checkInterval = setInterval(() => {
      const printFormatSection = document.querySelector('.print-format-toolbar, .page-head');
      
      if (printFormatSection) {
        clearInterval(checkInterval);
        
        // Check if button already exists
        if (document.getElementById('electron-print-btn')) {
          return;
        }

        // Create print button
        const btnGroup = document.createElement('div');
        btnGroup.style.cssText = 'display: inline-block; margin-left: 10px;';
        
        const printBtn = document.createElement('button');
        printBtn.id = 'electron-print-btn';
        printBtn.className = 'btn btn-primary btn-sm';
        printBtn.innerHTML = '🖨️ Native Print';
        printBtn.style.marginRight = '5px';
        printBtn.onclick = handleNativePrint;
        
        const pdfBtn = document.createElement('button');
        pdfBtn.id = 'electron-pdf-btn';
        pdfBtn.className = 'btn btn-default btn-sm';
        pdfBtn.innerHTML = '📄 Export PDF';
        pdfBtn.onclick = handlePDFExport;
        
        btnGroup.appendChild(printBtn);
        btnGroup.appendChild(pdfBtn);
        printFormatSection.appendChild(btnGroup);
      }
    }, 500);

    // Clear interval after 10 seconds if not found
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  // Handle native print
  async function handleNativePrint() {
    try {
      const result = await window.electronAPI.print({
        silent: false,
        printBackground: true,
        color: true,
        pageSize: 'A4'
      });

      if (result.success) {
        frappe.show_alert({
          message: __('Print job sent successfully'),
          indicator: 'green'
        }, 3);
      } else {
        frappe.show_alert({
          message: __('Print failed: ') + result.error,
          indicator: 'red'
        }, 5);
      }
    } catch (error) {
      console.error('Print error:', error);
      frappe.show_alert({
        message: __('Print error: ') + error.message,
        indicator: 'red'
      }, 5);
    }
  }

  // Handle PDF export
  async function handlePDFExport() {
    try {
      const result = await window.electronAPI.printToPDF({
        printBackground: true,
        pageSize: 'A4',
        marginType: 'default'
      });

      if (result.success) {
        frappe.show_alert({
          message: __('PDF exported successfully'),
          indicator: 'green'
        }, 3);
      } else if (result.error !== 'Cancelled') {
        frappe.show_alert({
          message: __('PDF export failed: ') + result.error,
          indicator: 'red'
        }, 5);
      }
    } catch (error) {
      console.error('PDF export error:', error);
      frappe.show_alert({
        message: __('PDF export error: ') + error.message,
        indicator: 'red'
      }, 5);
    }
  }

  // Intercept browser print dialog
  const originalPrint = window.print;
  window.print = function() {
    if (window.electronAPI) {
      handleNativePrint();
    } else {
      originalPrint.call(window);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addElectronPrintButton);
  } else {
    addElectronPrintButton();
  }

  // Also try after frappe is ready
  if (typeof frappe !== 'undefined') {
    frappe.ready(() => {
      setTimeout(addElectronPrintButton, 1000);
    });
  }

  console.log('ERPNext Desktop print enhancements loaded');
})();
