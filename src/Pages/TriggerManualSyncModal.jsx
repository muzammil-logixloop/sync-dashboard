import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TriggerManualSyncModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    tenant: 'Sweet Bakes',
    device: 'Tappy - 23B1',
    dataTypes: {
      products: true,
      transactions: false,
      customers: false,
      orders: false
    },
    syncMethod: 'full',
    forceErpResend: false,
    notes: ''
  });

  const handleDataTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [type]: !prev.dataTypes[type]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Triggering sync with data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Trigger Manual Sync</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-gray-600">Force a sync from device to ERP for a selected data type.</p>

          {/* Tenant and Device */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenant</label>
              <input
                type="text"
                value={formData.tenant}
                onChange={(e) => setFormData({...formData, tenant: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device</label>
              <input
                type="text"
                value={formData.device}
                onChange={(e) => setFormData({...formData, device: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Data Types to Sync */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Data types to Sync</label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries({
                products: 'Products',
                transactions: 'Transactions',
                customers: 'Customers',
                orders: 'Orders'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dataTypes[key]}
                    onChange={() => handleDataTypeChange(key)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sync Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sync Method</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="syncMethod"
                  value="full"
                  checked={formData.syncMethod === 'full'}
                  onChange={(e) => setFormData({...formData, syncMethod: e.target.value})}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="text-gray-700">Full Sync</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="syncMethod"
                  value="delta"
                  checked={formData.syncMethod === 'delta'}
                  onChange={(e) => setFormData({...formData, syncMethod: e.target.value})}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="text-gray-700">Delta Sync</span>
              </label>
            </div>
          </div>

          {/* Force ERP Resend Toggle */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-gray-700">Force ERP Resend</span>
            <button
              type="button"
              onClick={() => setFormData({...formData, forceErpResend: !formData.forceErpResend})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                formData.forceErpResend ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.forceErpResend ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              Trigger Sync
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TriggerManualSyncModal;