function calculate() {
  const initialAmount = parseFloat(document.getElementById('initialAmount').value);
  const dailyRatePercent = parseFloat(document.getElementById('dailyRate').value);
  const period = parseInt(document.getElementById('period').value);
  const ratePeriod = document.getElementById('ratePeriod').value;

  let currentAmount = initialAmount;
  const days = [];
  const startAmounts = [];
  const dailyIncomes = [];
  const endAmounts = [];

  for(let day = 1; day <= period; day++) {
    days.push(day);
    startAmounts.push(currentAmount);

    let income = 0;
    if (ratePeriod === 'day') {
      income = currentAmount * dailyRatePercent / 100;
    } else if (ratePeriod === 'month') {
      const monthlyRate = dailyRatePercent / 30;
      income = currentAmount * monthlyRate / 100;
    } else if (ratePeriod === 'year') {
      const yearlyRate = dailyRatePercent / 365;
      income = currentAmount * yearlyRate / 100;
    }

    dailyIncomes.push(income);
    currentAmount += income;
    endAmounts.push(currentAmount);
  }

  let tableHTML = `<table>
    <tr>
      <th>№ дня</th>
      <th>Начальная сумма на этот день</th>
      <th>Доход за этот день</th>
      <th>Конечная сумма на этот день</th>
    </tr>`;

  for(let i = 0; i < period; i++) {
    tableHTML += `<tr>
      <td>${days[i]}</td>
      <td>${startAmounts[i].toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽</td>
      <td>${dailyIncomes[i].toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽ (${dailyRatePercent}%)</td>
      <td>${endAmounts[i].toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽</td>
    </tr>`;
  }

  tableHTML += `<tr>
    <td>Итого:</td>
    <td>за ${period} дней из ${initialAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽</td>
    <td></td>
    <td>${currentAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽</td>
  </tr></table>`;

  document.getElementById('result').innerHTML = tableHTML;

  const ctx = document.getElementById('incomeChart').getContext('2d');
  if(window.incomeChartInstance) {
    window.incomeChartInstance.destroy();
  }
  window.incomeChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: 'Конечная сумма на этот день (₽)',
        data: endAmounts,
        borderColor: '#63b3ed',
        backgroundColor: 'rgba(99,179,237,0.3)',
        fill: true,
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Дни', color: '#cbd5e1' },
          ticks: { color: '#cbd5e1' },
          grid: { color: 'rgba(99,179,237,0.2)' }
        },
        y: {
          title: { display: true, text: 'Сумма (₽)', color: '#cbd5e1' },
          ticks: { color: '#cbd5e1' },
          grid: { color: 'rgba(99,179,237,0.3)' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#e0e7ff', font: { weight: '600' } }
        },
        tooltip: {
          backgroundColor: '#00428a',
          titleColor: '#aee0ff',
          bodyColor: '#d1e8ff',
        }
      }
    }
  });
}

function calculateProfitPercent() {
  const profit = parseFloat(document.getElementById('profit').value);
  const initialSum = parseFloat(document.getElementById('initialSum').value);

  if (initialSum === 0) {
    document.getElementById('profitResult').textContent = 'Начальная сумма не может быть 0';
    return;
  }
  const percentProfit = (profit / initialSum) * 100;
  document.getElementById('profitResult').textContent = percentProfit.toFixed(2) + '%';
}