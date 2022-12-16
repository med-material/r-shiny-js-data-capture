## Install and load needed libraries
library(shiny)
library(lubridate)
library(plotly)
library(dplyr)

# Suppport for Milliseconds
options("digits.secs"=6)

## Create the shiny UI layout
ui <- fluidPage(
    headerPanel("Whack-A-Mole VR"),
    mainPanel(
        plotlyOutput("TimePlot"),
        h4("Use the box select to learn more about which mole belongs the given timeline."),
        plotlyOutput("WhackPlot")
    )
)

## Create the Shiny Server layout
server <- function(input, output) {

    ## Read the fake csv data set about ice cream
    D_event<-read.csv("evalLog_2020-09-29 10-50-59.8069.csv", na.string="NULL")
    D_event <- D_event %>% mutate(TimeStamp = as.POSIXct(TimeStamp, format = "%Y-%m-%d %H:%M:%OS"))
    D_event$rowID <- 1:nrow(D_event)

    # Add label positions
    D_event <- D_event %>%
        mutate(labelpos = 0.5,
            labelpos = ifelse(D_event$EventType == "MoleEvent", 0.2, labelpos),
            labelpos = ifelse(D_event$EventType == "PointerEvent", 0.3, labelpos),
            labelpos = ifelse(D_event$EventType == "ModifierEvent", 0.4, labelpos))



    ## Create the plotly plot that compares price vs scoops
    output$TimePlot <- renderPlotly({
        timetemplate <- plot_ly() %>%
            config(scrollZoom = TRUE, displaylogo = FALSE, modeBarButtonsToRemove = c("hoverCompareCartesian", "toggleSpikelines","toImage", "sendDataToCloud", "editInChartStudio", "lasso2d", "drawclosedpath", "drawopenpath", "drawline", "drawcircle", "eraseshape", "autoScale2d", "hoverClosestCartesian","toggleHover")) %>%
            layout(dragmode = "pan", showlegend=FALSE, xaxis = list(tickformat="%H:%M:%S.%L ms"), yaxis = list(range=c(0,1.1)))

        timetemplate %>% 
            add_segments(data=D_event, name="Event", x =~TimeStamp, y=~labelpos-0.02, xend =~TimeStamp, yend =0, size=I(1), color=I("Gray")) %>%
            add_trace(data=D_event, name="Game Event Label", x =~TimeStamp, y =~labelpos, color = ~EventType, key=~rowID,
                      type='scatter',mode='text', text=~Event, textfont = list(size = 8)) %>%
            layout(dragmode = "select", clickmode = 'event+select' ) %>%
            event_register("plotly_selecting")
    })
    
    ## Create the plotly plot of price vs rating based on selection
    output$WhackPlot <- renderPlotly({
        Wall_moles <- expand.grid(0:D_event$WallColumnCount[1], 0:D_event$WallRowCount[1]) %>%
            rename(x = Var1, y = Var2)
            
        vistemplate <- plot_ly() %>%
            config(scrollZoom = TRUE, displaylogo = FALSE, modeBarButtonsToRemove = c("select2d","hoverCompareCartesian", "toggleSpikelines","zoom2d","toImage", "sendDataToCloud", "editInChartStudio", "lasso2d", "drawclosedpath", "drawopenpath", "drawline", "drawcircle", "eraseshape", "autoScale2d", "hoverClosestCartesian","toggleHover")) %>%
            layout(dragmode = "pan", showlegend=FALSE, xaxis=list(dtick = 1), yaxis=list(dtick = 1))

        select.data <- event_data(event = "plotly_selecting")
        if (!is.null(select.data)) {
            D_vis = D_event %>% filter(rowID %in% select.data$key)
        } else {
            D_vis = D_event
        }
        vistemplate %>%
            add_trace(data=Wall_moles,x=~x, y=~y, type='scatter',mode='markers',symbol=I('o'),marker=list(size=32),hoverinfo='none') %>%
            add_trace(data=D_vis, x=~MoleIndexX-1, y=~MoleIndexY-1, type='scatter', mode='markers',marker=list(size=32))
    })

}

shinyApp(ui = ui, server = server)
