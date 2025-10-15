import React from 'react';
import { X } from 'lucide-react';

interface TimePickerModalProps {
  scheduleTime: string;
  onSelectTime: (time: string) => void;
  onClose: () => void;
}

export default function TimePickerModal({ scheduleTime, onSelectTime, onClose }: TimePickerModalProps) {
  const times = [
    '08:00-10:00',
    '10:00-12:00',
    '12:00-14:00',
    '14:00-16:00',
    '15:00-17:00',
    '16:00-18:00',
    '18:00-20:00',
    '20:00-22:00',
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Välj tid</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => {
                  onSelectTime(time);
                  onClose();
                }}
                className={`p-3 text-center text-sm rounded-lg border-2 transition-colors ${
                  scheduleTime === time
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Avbryt
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bekräfta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


