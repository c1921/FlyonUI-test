<template>
    <div id="apex-single-area-chart" class="w-full"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { buildChart, buildTooltip } from '../utils/chartUtils'

onMounted(() => {
    buildChart('#apex-single-area-chart', mode => ({
        chart: {
            height: 400,
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        series: [
            {
                name: 'Units',
                data: [0, 100, 50, 125, 70, 150, 100, 170, 120, 175, 100, 200]
            }
        ],
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            strokeDashArray: 2,
            borderColor: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)'
        },
        colors: ['var(--color-primary)'], // color var
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                gradientToColors: ['var(--color-base-100)'],
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            type: 'category',
            tickPlacement: 'on',
            categories: [
                '1 March 2024',
                '2 March 2024',
                '3 March 2024',
                '4 March 2024',
                '5 March 2024',
                '6 March 2024',
                '7 March 2024',
                '8 March 2024',
                '9 March 2024',
                '10 March 2024',
                '11 March 2024',
                '12 March 2024'
            ],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false
            },
            labels: {
                style: {
                    colors: 'var(--color-base-content)',
                    fontSize: '12px',
                    fontWeight: 400
                },
                formatter: title => {
                    let t = title

                    if (t) {
                        const newT = t.split(' ')
                        t = `${newT[0]} ${newT[1].slice(0, 3)}`
                    }

                    return t
                }
            }
        },
        yaxis: {
            labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: {
                    colors: 'var(--color-base-content)',
                    fontSize: '12px',
                    fontWeight: 400
                },
                formatter: value => (value >= 1000 ? `${value / 1000}k` : value)
            }
        },
        tooltip: {
            x: {
                format: 'MMMM yyyy'
            },
            y: {
                formatter: value => `${value >= 1000 ? `${value / 1000}k` : value}`
            },
            custom: function (props) {
                const { categories } = props.ctx.opts.xaxis
                const { dataPointIndex } = props
                const title = categories[dataPointIndex].split(' ')
                const newTitle = `${title[0]} ${title[1]}`
                
                // 正确传递当前作用域的mode变量
                const currentMode = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

                return buildTooltip(props, {
                    title: newTitle,
                    mode: currentMode,
                    valuePrefix: '',
                    hasTextLabel: true,
                    markerExtClasses: 'bg-primary',
                    wrapperExtClasses: ''
                })
            }
        },
        responsive: [
            {
                breakpoint: 568,
                options: {
                    chart: {
                        height: 300
                    },
                    labels: {
                        style: {
                            fontSize: '10px',
                            colors: 'var(--color-base-content)'
                        },
                        offsetX: -2,
                        formatter: title => title.slice(0, 3)
                    },
                    yaxis: {
                        labels: {
                            align: 'left',
                            minWidth: 0,
                            maxWidth: 140,
                            style: {
                                fontSize: '10px',
                                colors: 'var(--color-base-content)'
                            },
                            formatter: value => (value >= 1000 ? `${value / 1000}k` : value)
                        }
                    }
                }
            }
        ]
    }))
})
</script>
