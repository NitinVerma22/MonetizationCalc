'use client';

import { useState } from 'react';

export default function MonetizationCalculator() {
  const [targetAmount, setTargetAmount] = useState(50);
  const [cpm, setCpm] = useState(60);
  const [userShare, setUserShare] = useState(20);
  const [interval, setInterval] = useState(3);
  const [totalUsers, setTotalUsers] = useState(1000);

  const revenuePerAd = cpm / 1000;
  const userEarningPerAd = revenuePerAd * (userShare / 100);
  const ownerEarningPerAd = revenuePerAd * ((100 - userShare) / 100);
  const adsRequired = Math.ceil(targetAmount / userEarningPerAd);
  const totalMinutes = adsRequired * interval;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  const adsPerUserPerHour = 60 / interval;
  const totalAdsPerHour = adsPerUserPerHour * totalUsers;
  const totalRevenuePerHour = totalAdsPerHour * revenuePerAd;
  const totalUserEarningPerHour = totalRevenuePerHour * (userShare / 100);
  const totalOwnerProfitPerHour = totalRevenuePerHour * ((100 - userShare) / 100);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Monetization Earnings Calculator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {([
          ['Target Amount (₹)', targetAmount, setTargetAmount],
          ['CPM (₹)', cpm, setCpm],
          ['User Share (%)', userShare, setUserShare],
          ['Ad Interval (min)', interval, setInterval],
          ['Total Users', totalUsers, setTotalUsers],
        ] as [string, number, React.Dispatch<React.SetStateAction<number>>][]).map(([label, value, setter], idx) => (
          <div key={idx}>
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={value}
              onChange={(e) => setter(Number(e.target.value))}
              min={0}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">📈 Individual User</h2>
          <p>💰 Earn Per Ad: ₹{userEarningPerAd.toFixed(3)}</p>
          <p>🧮 Ads Required: {adsRequired}</p>
          <p>🕒 Total Time: {totalMinutes} min (~{totalHours.toFixed(2)} hrs / {totalDays.toFixed(2)} days)</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">💼 Your Earnings</h2>
          <p>🪙 Per Ad Profit: ₹{ownerEarningPerAd.toFixed(3)}</p>
          <p>⚡ Total Ads/hr: {totalAdsPerHour}</p>
          <p>💵 Revenue/hr: ₹{totalRevenuePerHour.toFixed(2)}</p>
          <p>👥 Users/hr Earn: ₹{totalUserEarningPerHour.toFixed(2)}</p>
          <p>🧾 You/hr Profit: ₹{totalOwnerProfitPerHour.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}


