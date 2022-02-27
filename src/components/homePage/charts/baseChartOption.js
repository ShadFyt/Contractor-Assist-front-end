export let chartOptions = {
    chart: {
        height: 350,
        type: "area",
        zoom: {
            enabled: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Nov",
        "Dec",
    ],
    grid: {
        show: false,
    },
    stroke: {
        curve: "straight",
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

export const hoursChartOptions = {
    chart: {
        height: 350,
        type: 'bar',
    },
    colors: ["#a3a1f0", "#e3368a", "#edc0d6", "#7d0c96", "#91f06e", "#0600e6",],
    plotOptions: {
        bar: {
            columnWidth: '35%',
            distributed: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts'],
        ],
        labels: {
            style: {
                colors: ["black"],
                fontSize: '12px'
            }
        }
    },
    yaxis: {
        title: {
            text: 'HOURS'
        }
    },
}