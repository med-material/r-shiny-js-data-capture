#
# This is the server logic of a Shiny web application. You can run the
# application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

# Define server logic required to draw a histogram
shinyServer(function(input, output, session) {
    
  r <- reactiveValues(df = NULL, meta = NULL, source = NULL)

  callModule(data_selection_summary,"input_info", reactive(r$df))
  callModule(player_overview,"overview_panel", reactive(r$df), reactive(r$meta))
  callModule(individual_game_performance,"individual_game_performance", reactive(r$df), reactive(r$meta))
  callModule(individual_head_movement,"individual_head_movement", reactive(r$df), reactive(r$meta))
  callModule(individual_gaze_movement, "individual_gaze_movement", reactive(r$df), reactive(r$meta))
  callModule(individual_controller_movement, "individual_controller_movement", reactive(r$df), reactive(r$meta))
  callModule(game_timeline,"timeline_panel", reactive(r$df))
  
  ## Onclick action button
  onclick("btn_download", runjs("stock_event+= logging_ended+','; Meta();Btn(stock_event,link_event,head_fields1);Btn(stock_frequence,link_continuous_measurment,head_fields2);Btn(stock_meta,link_meta,head_fields3)"))
  onclick("btn_clear", runjs("stock_event='';stock_continuous_measurement='';stock_frequence='';stock_meta=''"))

  #auth = read.csv("credentials.csv", header=TRUE,sep=",", colClasses=c("character"))
  connected = FALSE
  if (!connected) {
    r$df <- NA
    shinyjs::disable("DbButton")
  }
  
  db_data <- callModule(db_select, "selectData", connected)
  csv_data <- callModule(csv_upload, "uploadData")

  
  observeEvent(csv_data$trigger, {
    req(csv_data$trigger > 0)
    r$df <- csv_data$df
    r$meta <- csv_data$df_meta
    r$source <- min(as.character(csv_data$meta$SessionID, na.rm=T))
  })
  observeEvent(db_data$trigger, {
    req(db_data$trigger > 0)
    r$df <- db_data$df
    r$meta <- db_data$df_meta
    r$source <- db_data$session
  })
  
  observeEvent(input$CsvButton, {
    insertUI(selector = "#CsvButton", where = "afterEnd",
             ui = showModal(modalDialog(csv_upload_UI("uploadData"), easyClose = TRUE)))
  })
  observeEvent(input$DbButton, {
    insertUI(selector = "#DbButton", where = "afterEnd",
             ui = showModal(modalDialog(db_select_UI("selectData"), easyClose = TRUE)))
  })
})
