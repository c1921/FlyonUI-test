import ApexCharts from 'apexcharts';

// 渲染图表函数
export function buildChart(selector: string, optionsFactory: (mode: string) => any) {
    const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const options = optionsFactory(mode);
    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
    return chart;
}

// 构建自定义tooltip函数
export function buildTooltip(props: any, config: any) {
    const { series, seriesIndex, dataPointIndex, w } = props;
    const { title, valuePrefix, hasTextLabel, markerExtClasses, wrapperExtClasses } = config;
    
    const value = series[seriesIndex][dataPointIndex];
    const color = w.globals.colors[seriesIndex];
    
    return `
        <div class="bg-base-200 border border-base-300 rounded-lg shadow-lg p-3 ${wrapperExtClasses}">
            <div class="text-sm font-medium text-base-content">${title}</div>
            <div class="flex items-center mt-1">
                <span class="w-3 h-3 rounded-full mr-2 ${markerExtClasses}" style="background-color: ${color}"></span>
                <span class="text-base-content">${hasTextLabel ? 'Value: ' : ''}${valuePrefix}${value}</span>
            </div>
        </div>
    `;
}
