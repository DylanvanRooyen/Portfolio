const MOCK_DATA = {
    'AAPL': {
        companyName: ["Apple Inc."],
        exchange: "NASDAQ",
        prices: generateCandlestickData(150.50, 60),
        news: [
            { title: "Apple unveils new iPhone with advanced AI features.", sentiment: 'positive', url: '#' },
            { title: "Analysts raise price target on strong services growth.", sentiment: 'positive', url: '#' },
            { title: "Supply chain concerns ease for Q4 production.", sentiment: 'neutral', url: '#' },
            { title: "Regulatory scrutiny increases in European markets.", sentiment: 'negative', url: '#' },
        ],
        analysis: "Based on the LSTM model, AAPL shows strong upward momentum..."
    },
    'MSFT': {
        companyName: ["Microsoft Corp."],
        exchange: "NASDAQ",
        prices: generateCandlestickData(305.22, 60),
        news: [
            { title: "Microsoft's cloud division posts record revenue.", sentiment: 'positive', url: '#' },
            { title: "New partnership announced to expand AI services.", sentiment: 'positive', url: '#' },
            { title: "Competition in gaming sector heats up.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "MSFT's forecast is stable, anchored by its dominant position..."
    },
    'GOOGL': {
        companyName: ["Alphabet Inc.", "Google"],
        exchange: "NASDAQ",
        prices: generateCandlestickData(135.80, 60),
        news: [
            { title: "Google's ad revenue exceeds expectations.", sentiment: 'positive', url: '#' },
            { title: "Waymo division reaches new autonomous driving milestone.", sentiment: 'positive', url: '#' },
            { title: "Antitrust lawsuit proceeds to next stage.", sentiment: 'negative', url: '#' },
            { title: "Investment in quantum computing shows long-term promise.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "GOOGL's projection is mixed. While core ad revenue is strong..."
    },

    // --- Added Stocks ---
    'AMZN': {
        companyName: ["Amazon.com Inc."],
        exchange: "NASDAQ",
        prices: generateCandlestickData(185.30, 60),
        news: [
            { title: "Amazon Web Services (AWS) secures major new enterprise client.", sentiment: 'positive', url: '#' },
            { title: "Prime Day sales smash previous records, boosting Q3 outlook.", sentiment: 'positive', url: '#' },
            { title: "Amazon continues expansion into healthcare logistics.", sentiment: 'neutral', url: '#' },
            { title: "EU launches new antitrust probe into Amazon's marketplace practices.", sentiment: 'negative', url: '#' },
        ],
        analysis: "AMZN's outlook is buoyed by the consistent growth of AWS and its dominant e-commerce market share. Regulatory headwinds remain a key factor to watch."
    },
    'NVDA': {
        companyName: ["NVIDIA Corporation"],
        exchange: "NASDAQ",
        prices: generateCandlestickData(125.10, 60),
        news: [
            { title: "NVIDIA reports blockbuster earnings driven by H100 GPU sales for AI.", sentiment: 'positive', url: '#' },
            { title: "Unveils next-gen 'Blackwell' architecture to extend AI dominance.", sentiment: 'positive', url: '#' },
            { title: "New US restrictions on chip exports to China could impact future revenue.", sentiment: 'negative', url: '#' },
            { title: "Competitors race to develop viable alternatives to CUDA platform.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "NVDA's valuation is heavily tied to the ongoing AI boom. Continued demand for its high-performance GPUs is critical for sustaining its growth trajectory."
    },
    'TSLA': {
        companyName: ["Tesla, Inc."],
        exchange: "NASDAQ",
        prices: generateCandlestickData(182.65, 60),
        news: [
            { title: "Tesla's Giga-factory in Mexico receives final construction permits.", sentiment: 'positive', url: '#' },
            { title: "Full Self-Driving (FSD) subscription model sees increased adoption.", sentiment: 'positive', url: '#' },
            { title: "Increased competition from legacy automakers in the EV space.", sentiment: 'negative', url: '#' },
            { title: "Analysts debate impact of recent price cuts on profit margins.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "TSLA remains a market leader but faces growing pains. The stock is sensitive to production numbers, delivery reports, and sentiment around its autonomous driving technology."
    },
    'META': {
        companyName: ["Meta Platforms, Inc.", "Facebook"],
        exchange: "NASDAQ",
        prices: generateCandlestickData(505.75, 60),
        news: [
            { title: "Meta's ad revenue growth rebounds as digital ad market recovers.", sentiment: 'positive', url: '#' },
            { title: "User engagement on Threads surpasses 150 million monthly active users.", sentiment: 'positive', url: '#' },
            { title: "Reality Labs division continues to post significant operating losses.", sentiment: 'negative', url: '#' },
            { title: "Debate continues over the long-term viability and timeline of the Metaverse.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "META's 'year of efficiency' has positively impacted its bottom line. Future growth depends on monetizing newer platforms and managing the high cost of its Metaverse ambitions."
    },

    // --- Added Cryptocurrencies ---
    'BTC': {
        companyName: ["Bitcoin"],
        exchange: "CRYPTO",
        prices: generateCandlestickData(65450.00, 60),
        news: [
            { title: "Major asset manager files for a new spot Bitcoin ETF.", sentiment: 'positive', url: '#' },
            { title: "Bitcoin halving successfully completed, reducing new supply issuance.", sentiment: 'positive', url: '#' },
            { title: "SEC delays decision on several pending crypto regulations.", sentiment: 'negative', url: '#' },
            { title: "BTC struggles to break key $70,000 resistance level amid macro uncertainty.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "Bitcoin's price action is heavily influenced by macroeconomic factors like interest rates, as well as institutional adoption and regulatory developments."
    },
    'ETH': {
        companyName: ["Ethereum"],
        exchange: "CRYPTO",
        prices: generateCandlestickData(3455.20, 60),
        news: [
            { title: "Spot Ethereum ETFs begin trading, attracting significant initial inflows.", sentiment: 'positive', url: '#' },
            { title: "Dencun upgrade successfully lowers transaction fees on Layer-2 networks.", sentiment: 'positive', url: '#' },
            { title: "SEC closes investigation into Ethereum 2.0, providing regulatory clarity.", sentiment: 'positive', url: '#' },
            { title: "Competition from alternative Layer-1 blockchains like Solana continues to grow.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "Ethereum's value is linked to its utility as a platform for DeFi, NFTs, and smart contracts. Gas fees and scalability remain long-term challenges."
    },
    'SOL': {
        companyName: ["Solana"],
        exchange: "CRYPTO",
        prices: generateCandlestickData(155.80, 60),
        news: [
            { title: "Solana network activity surges, driven by memecoin trading.", sentiment: 'positive', url: '#' },
            { title: "Several high-profile projects announce migration to Solana ecosystem.", sentiment: 'positive', url: '#' },
            { title: "Network experiences intermittent congestion during peak demand.", sentiment: 'negative', url: '#' },
            { title: "Developers release 'Firedancer' client, aiming to improve network stability.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "Solana is positioned as a high-throughput competitor to Ethereum. Its performance is often weighed against concerns about network reliability and decentralization."
    },
    'XRP': {
        companyName: ["XRP", "Ripple"],
        exchange: "CRYPTO",
        prices: generateCandlestickData(0.48, 60),
        news: [
            { title: "Ripple announces new partnerships with international payment providers.", sentiment: 'positive', url: '#' },
            { title: "Final judgment in SEC vs. Ripple case awaited by the community.", sentiment: 'neutral', url: '#' },
            { title: "XRP price remains suppressed pending full legal clarity in the US.", sentiment: 'negative', url: '#' },
            { title: "Development on the XRP Ledger continues with focus on CBDC applications.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "XRP's market performance is uniquely tied to the legal outcomes of Ripple Labs' lawsuit with the SEC. It is primarily valued for its potential in cross-border payments."
    },

    // --- Added Commodities ---
    'XAU': {
        companyName: ["Gold"],
        exchange: "COMMODITIES",
        prices: generateCandlestickData(2350.50, 60),
        news: [
            { title: "Central bank gold purchases hit a new quarterly high.", sentiment: 'positive', url: '#' },
            { title: "Investors flock to gold amid persistent global inflation fears.", sentiment: 'positive', url: '#' },
            { title: "A strengthening US Dollar puts downward pressure on gold prices.", sentiment: 'negative', url: '#' },
            { title: "Analysts watch Fed interest rate decisions for gold's next directional move.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "Gold remains a key safe-haven asset, reacting to geopolitical instability, inflation data, and US monetary policy. Its price is often inversely correlated with the dollar."
    },
    'WTI': {
        companyName: ["Crude Oil", "WTI Crude", "West Texas Intermediate"],
        exchange: "COMMODITIES",
        prices: generateCandlestickData(80.75, 60),
        news: [
            { title: "OPEC+ agrees to extend production cuts to support prices.", sentiment: 'positive', url: '#' },
            { title: "Geopolitical tensions in the Middle East raise supply disruption fears.", sentiment: 'positive', url: '#' },
            { title: "EIA reports surprise build in US crude inventories, weighing on prices.", sentiment: 'negative', url: '#' },
            { title: "Global economic slowdown concerns could dampen future oil demand.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "Crude oil prices are a barometer for the global economy, driven by the delicate balance of supply (OPEC, US shale) and demand (industrial activity, travel)."
    },
    'XAG': {
        companyName: ["Silver"],
        exchange: "COMMODITIES",
        prices: generateCandlestickData(29.80, 60),
        news: [
            { title: "Industrial demand for silver in solar panels and EVs hits record high.", sentiment: 'positive', url: '#' },
            { title: "Silver benefits from safe-haven flows alongside gold.", sentiment: 'positive', url: '#' },
            { title: "Large inventories on commodity exchanges could cap sharp price rallies.", sentiment: 'negative', url: '#' },
            { title: "The gold/silver ratio remains a key indicator for precious metals traders.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "Silver has a dual role as both a precious metal and an industrial commodity. Its price is influenced by investment demand and industrial consumption trends."
    },
    'NG': {
        companyName: ["Natural Gas", "Nat Gas"],
        exchange: "COMMODITIES",
        prices: generateCandlestickData(2.85, 60),
        news: [
            { title: "Heatwave across North America boosts demand for gas-powered electricity.", sentiment: 'positive', url: '#' },
            { title: "EU successfully fills gas storage facilities ahead of winter season.", sentiment: 'positive', url: '#' },
            { title: "Higher-than-expected production from US shale basins adds to supply.", sentiment: 'negative', url: '#' },
            { title: "LNG export capacity developments are closely monitored by the market.", sentiment: 'neutral', url: '#' },
        ],
        analysis: "Natural Gas prices are highly volatile and seasonal, driven by weather forecasts, storage levels, and industrial demand. LNG exports have increasingly linked US and global prices."
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

/**
 * Fetches data based on user input, which can be a stock ticker or a company name.
 */
function fetchData() {
    const searchTerm = tickerInput.value.trim();
    if (!searchTerm) {
        showError("Please enter a stock ticker or name.");
        return;
    }

    let ticker = null;
    let data = null;

    // First, try to find a direct match with the ticker symbol (case-insensitive)
    const upperCaseSearchTerm = searchTerm.toUpperCase();
    if (MOCK_DATA[upperCaseSearchTerm]) {
        ticker = upperCaseSearchTerm;
        data = MOCK_DATA[ticker];
    } else {
        // If no ticker match, search by company name (case-insensitive, partial match)
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        // Updated search logic to check the companyName array
        const foundTicker = Object.keys(MOCK_DATA).find(key => 
            MOCK_DATA[key].companyName.some(name => name.toLowerCase().includes(lowerCaseSearchTerm))
        );
        
        if (foundTicker) {
            ticker = foundTicker;
            data = MOCK_DATA[ticker];
        }
    }

    // If no data is found by either ticker or name, show an error
    if (!data) {
        showError(`No data found for "${searchTerm}". Try AAPL, Microsoft, or Google.`);
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
    // Display the first name in the array as the primary name
    document.getElementById('chart-title').textContent = `${data.companyName[0]} (${ticker})`;
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
            interaction: {                mode: 'index',
                intersect: false
            }
        }
    });

    renderCustomLegend(stockChart);
}
