import React from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface DatePickerModalProps {
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  onSelectDate: (date: string) => void;
  onClose: () => void;
}

export default function DatePickerModal({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  onSelectDate,
  onClose,
}: DatePickerModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Välj startdatum</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const newMonth = selectedMonth - 1;
                if (newMonth < 0) {
                  setSelectedMonth(11);
                  setSelectedYear(selectedYear - 1);
                } else {
                  setSelectedMonth(newMonth);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {new Date(selectedYear, selectedMonth).toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => {
                const newMonth = selectedMonth + 1;
                if (newMonth > 11) {
                  setSelectedMonth(0);
                  setSelectedYear(selectedYear + 1);
                } else {
                  setSelectedMonth(newMonth);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600 rotate-180" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {(() => {
              const currentDate = new Date();
              const currentMonth = currentDate.getMonth();
              const currentYear = currentDate.getFullYear();
              const currentDay = currentDate.getDate();

              const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
              const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
              const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

              const days: React.ReactNode[] = [];

              for (let i = 0; i < adjustedFirstDay; i++) {
                days.push(<div key={`empty-${i}`} className="p-2"></div>);
              }

              for (let day = 1; day <= daysInMonth; day++) {
                const isPastDate = selectedYear < currentYear ||
                  (selectedYear === currentYear && selectedMonth < currentMonth) ||
                  (selectedYear === currentYear && selectedMonth === currentMonth && day < currentDay);

                days.push(
                  <button
                    key={day}
                    onClick={() => {
                      const monthNames = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
                      onSelectDate(`${day} ${monthNames[selectedMonth]}`);
                      onClose();
                    }}
                    disabled={isPastDate}
                    className={`p-2 text-center text-sm rounded-lg transition-colors ${
                      isPastDate ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {day}
                  </button>
                );
              }

              return days;
            })()}
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


