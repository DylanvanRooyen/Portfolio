const MOCK_DATA = {
    'AAPL': {
        companyName: "Apple Inc.",
        exchange: "NASDAQ",
        prices: generateCandlestickData(150.50, 60),
        news: [
            { title: "Apple unveils new iPhone with advanced AI features.", sentiment: 'positive', url: '#' },
            { title: "Analysts raise price target on strong services growth.", sentiment: 'positive', url: '#' },
            { title: "Supply chain concerns ease for Q4 production.", sentiment: 'neutral', url: '#' },
            { title: "Regulatory scrutiny increases in European markets.", sentiment: 'negative', url: '#' },
        ],
        analysis: "Based on the LSTM model, AAPL shows strong upward momentum, driven by positive sentiment around its new product cycle and robust services revenue. The projection indicates a potential short-term target of $185, though market volatility remains a key factor. The 50-day moving average is trending above the 200-day, confirming a bullish outlook."
    },
    'MSFT': {
        companyName: "Microsoft Corp.",
        exchange: "NASDAQ",
        prices: generateCandlestickData(305.22, 60),
        news: [
            { title: "Microsoft's cloud division posts record revenue.", sentiment: 'positive', url: '#' },
            { title: "New partnership announced to expand AI services.", sentiment: 'positive', url: '#' },
            { title: "Competition in gaming sector heats up.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "MSFT's forecast is stable, anchored by its dominant position in cloud computing. The model predicts steady, gradual growth, with minor fluctuations. Key support is observed near the 200-day moving average. News sentiment is largely positive, providing a solid foundation for the current valuation."
    },
    'GOOGL': {
        companyName: "Alphabet Inc.",
        exchange: "NASDAQ",
        prices: generateCandlestickData(135.80, 60),
        news: [
            { title: "Google's ad revenue exceeds expectations.", sentiment: 'positive', url: '#' },
            { title: "Waymo division reaches new autonomous driving milestone.", sentiment: 'positive', url: '#' },
            { title: "Antitrust lawsuit proceeds to next stage.", sentiment: 'negative', url: '#' },
            { title: "Investment in quantum computing shows long-term promise.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "GOOGL's projection is mixed. While core ad revenue is strong, ongoing legal challenges introduce uncertainty, reflected as higher volatility in the forecast. The model suggests a wide potential price range. The stock is currently trading between its 50-day and 200-day moving averages, indicating a period of consolidation."
    }
};

function generateCandlestickData(startPrice, days) {
    let data = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - days);
    let price = startPrice;

    for (let i = 0; i < days; i++) {
        const open = price;
        const change = (Math.random() - 0.48) * (price * 0.03);
        price += change;
        const high = Math.max(open, price) + (Math.random() * price * 0.01);
        const low = Math.min(open, price) - (Math.random() * price * 0.01);
        const close = price;
        const volume = Math.floor(Math.random() * (2000000 - 500000 + 1)) + 500000;
        
        data.push({
            x: currentDate.getTime(),
            o: open,
            h: high,
            l: low,
            c: close,
            v: volume
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
}

const tickerInput = document.getElementById('tickerInput');
const getDataBtn = document.getElementById('getDataBtn');
const errorMessage = document.getElementById('error-message');
const initialMessage = document.getElementById('initial-message');
const mainContent = document.getElementById('main-content');
const loader = document.getElementById('loader');

let stockChart = null;

getDataBtn.addEventListener('click', fetchData);
tickerInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        fetchData();
    }
});

function fetchData() {
    const ticker = tickerInput.value.toUpperCase().trim();
    if (!ticker) {
        showError("Please enter a ticker.");
        return;
    }

    const data = MOCK_DATA[ticker];
    if (!data) {
        showError(`No data found for ticker "${ticker}". Try AAPL, MSFT, or GOOGL.`);
        return;
    }
    
    showError(""); // Clear previous errors
    initialMessage.classList.add('hidden');
    mainContent.classList.remove('hidden');
    loader.classList.remove('hidden');

    // Simulate API call delay
    setTimeout(() => {
        updateUI(ticker, data);
        loader.classList.add('hidden');
    }, 1000);
}

function showError(message) {
    errorMessage.textContent = message;
}

function updateUI(ticker, data) {
    updateChartTitle(ticker, data);
    updateKeyMetrics(data.prices);
    updateNews(data.news);
    document.getElementById('analysis-text').textContent = data.analysis;
    renderChart(data.prices);
}

function updateChartTitle(ticker, data) {
    document.getElementById('chart-title').textContent = `${data.companyName} (${ticker})`;
    document.getElementById('chart-subtitle').textContent = `Source: ${data.exchange} (Mock Data)`;
}

function updateKeyMetrics(prices) {
    const container = document.getElementById('key-metrics-container');
    const latest = prices[prices.length - 1];
    const previous = prices[prices.length - 2];
    const change = latest.c - previous.c;
    const changePercent = (change / previous.c) * 100;
    const isPositive = change >= 0;

    const metrics = [
        { label: 'Last Close', value: `$${latest.c.toFixed(2)}` },
        { label: 'Change', value: `${isPositive ? '+' : ''}${change.toFixed(2)} (${changePercent.toFixed(2)}%)`, color: isPositive ? 'text-green-600' : 'text-red-600' },
        { label: 'Day High', value: `$${latest.h.toFixed(2)}` },
        { label: 'Day Low', value: `$${latest.l.toFixed(2)}` },
        { label: 'Volume', value: `${(latest.v / 1e6).toFixed(2)}M` },
    ];
    
    container.innerHTML = metrics.map(metric => `
        <div class="flex flex-col">
            <span class="text-sm text-slate-500">${metric.label}</span>
            <span class="text-lg font-semibold ${metric.color || ''}">${metric.value}</span>
        </div>
    `).join('');
}

function updateNews(newsItems) {
    const container = document.getElementById('news-container');
    if (!newsItems || newsItems.length === 0) {
        container.innerHTML = `<p class="text-sm text-slate-400">No recent news available.</p>`;
        return;
    }

    const sentimentClasses = {
        positive: 'bg-green-100 text-green-800',
        neutral: 'bg-stone-100 text-stone-800',
        negative: 'bg-red-100 text-red-800'
    };
    
    container.innerHTML = newsItems.map(item => `
        <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 mt-1 w-2 h-2 rounded-full ${sentimentClasses[item.sentiment].split(' ')[0]}"></div>
            <div>
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-slate-700 hover:text-amber-600 hover:underline">${item.title}</a>
            </div>
        </div>
    `).join('');
}

function calculateMovingAverage(data, period) {
    if (data.length < period) return [];
    return data.slice(period - 1).map((d, i) => {
        const sum = data.slice(i, i + period).reduce((acc, val) => acc + val.c, 0);
        return { x: d.x, y: sum / period };
    });
}

function generatePrediction(data) {
    const lastDataPoint = data[data.length - 1];
    let price = lastDataPoint.c;
    const prediction = [{ x: lastDataPoint.x, y: price }];
    
    for(let i=0; i<10; i++) {
        price *= (1 + (Math.random() - 0.45) * 0.01);
        const newDate = new Date(prediction[prediction.length-1].x);
        newDate.setDate(newDate.getDate() + 1);
        prediction.push({x: newDate.getTime(), y: price});
    }
    return prediction;
}

function renderCustomLegend(chart) {
    const legendContainer = document.getElementById('custom-legend');
    legendContainer.innerHTML = ''; // Clear previous legend

    chart.data.datasets.forEach((dataset, index) => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-toggle');

        const colorBox = document.createElement('span');
        colorBox.classList.add('legend-toggle-color-box');
        
        const color = dataset.borderColor || (dataset.color ? dataset.color.up : dataset.backgroundColor);
        colorBox.style.backgroundColor = color;
        
        const text = document.createTextNode(dataset.label);

        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);

        if (!chart.isDatasetVisible(index)) {
            legendItem.classList.add('hidden-dataset');
        }

        legendItem.onclick = () => {
            const isVisible = chart.isDatasetVisible(index);
            chart.setDatasetVisibility(index, !isVisible);
            legendItem.classList.toggle('hidden-dataset');
            chart.update();
        };

        legendContainer.appendChild(legendItem);
    });
}

function renderChart(priceData) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    if (stockChart) {
        stockChart.destroy();
    }
    
    const ma50 = calculateMovingAverage(priceData, 50);
    const predictionData = generatePrediction(priceData);

    stockChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'Price (OHLC)',
                data: priceData,
                borderColor: 'black',
                color: {
                    up: 'rgba(8, 143, 79, 0.8)',
                    down: 'rgba(213, 51, 51, 0.8)',
                    unchanged: 'rgba(108, 122, 137, 0.8)',
                },
                yAxisID: 'y'
            }, {
                type: 'line',
                label: '50-Day MA',
                data: ma50,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1.5,
                pointRadius: 0,
                yAxisID: 'y'
            }, {
                type: 'line',
                label: 'Prediction',
                data: predictionData,
                borderColor: 'rgb(245, 158, 11)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                yAxisID: 'y'
            }, {
                type: 'bar',
                label: 'Volume',
                data: priceData.map(d => ({ x: d.x, y: d.v })),
                backgroundColor: 'rgba(156, 163, 175, 0.4)',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        source: 'auto',
                        maxRotation: 0,
                        autoSkip: true,
                    }
                },
                y: {
                    position: 'left',
                    grid: {
                        color: 'rgba(200, 200, 200, 0.1)'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value.toFixed(2);
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return (value / 1e6) + 'M';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Default legend is now disabled
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });

    renderCustomLegend(stockChart);
}
