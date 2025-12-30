/**
 * Thermal Printer Configuration for ERPNext Desktop
 * 
 * This module provides configuration for common thermal printer types
 * used in retail, warehousing, and POS environments.
 */

const thermalPrinterConfigs = {
  // 80mm thermal receipt printer (common in POS)
  thermal_80mm: {
    pageSize: { width: 80000, height: 200000 }, // in microns
    margins: { marginType: 'none' },
    printBackground: false,
    color: false,
    landscape: false,
    scaleFactor: 100
  },

  // 58mm thermal receipt printer (compact POS)
  thermal_58mm: {
    pageSize: { width: 58000, height: 200000 },
    margins: { marginType: 'none' },
    printBackground: false,
    color: false,
    landscape: false,
    scaleFactor: 85
  },

  // Label printer (shipping labels, barcodes)
  label_4x6: {
    pageSize: { width: 101600, height: 152400 }, // 4" x 6" in microns
    margins: { marginType: 'none' },
    printBackground: true,
    color: false,
    landscape: false,
    scaleFactor: 100
  },

  // A4 standard printer
  a4_standard: {
    pageSize: 'A4',
    margins: { marginType: 'default' },
    printBackground: true,
    color: true,
    landscape: false,
    scaleFactor: 100
  },

  // Letter size (US standard)
  letter_standard: {
    pageSize: 'Letter',
    margins: { marginType: 'default' },
    printBackground: true,
    color: true,
    landscape: false,
    scaleFactor: 100
  }
};

module.exports = {
  thermalPrinterConfigs,

  /**
   * Get printer configuration by type
   * @param {string} printerType - Type of printer
   * @returns {object} Printer configuration
   */
  getPrinterConfig(printerType) {
    return thermalPrinterConfigs[printerType] || thermalPrinterConfigs.a4_standard;
  },

  /**
   * List available printer configurations
   * @returns {Array} List of printer types
   */
  getAvailableConfigs() {
    return Object.keys(thermalPrinterConfigs).map(key => ({
      id: key,
      name: key.replace(/_/g, ' ').toUpperCase()
    }));
  }
};
