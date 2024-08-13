import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
  } from "./ui/chart"

  export function Statistics () {
    return(
        <div className="flex flex-col gap-4">
            <ChartContainer {}>
                <ChartTooltip>
                    <ChartTooltipContent />
                </ChartTooltip>
                <ChartLegend>
                    <ChartLegendContent />
                </ChartLegend>
                <ChartStyle />
            </ChartContainer>
        </div>
    )
  }