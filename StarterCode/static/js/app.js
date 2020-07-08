function demoInfo(id) {
  // read the json file to get data
    d3.json("samples.json").then((data)=> {
        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data and clear panel for new data
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

// Create function for plotting data (Bar, gauge, bubble)
function buildPlots(id) {
    // getting data from the json file
    d3.json("samples.json").then((data)=> {
        console.log(data)
        // Number of washes
        var washFreq = data.metadata.map(w => w.wfreq)
        console.log(`Wash Frequency: ${washFreq}`)
        //Filter "samples" by // ID
        var samples = data.samples.filter(s =>s.id.toString() === id)[0];
        console.log(samples)
        //Top 10
        var values = samples.sample_values.slice(0, 10).reverse();
        console.log(`Values: ${values}`)
        //Top 10 otu
        var topOTU = samples.otu_ids.slice(0, 10).reverse();
        console.log(`Top OTU: ${topOTU}`)
        // OTU OTU IDs
        var OTUids = topOTU.map(i => "OTU: " + i)
        console.log(`OTU IDs: ${OTUids}`)
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        // create trace variable for the plot
        var trace = {
            x: values,
            y: OTUids,
            text: labels,
            marker: {
              color: '#337AB7'},
            type:"bar",
            orientation: "h",
        };

        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // create the bar plot
        Plotly.newPlot("bar", data, layout);

        // The bubble chart
        var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
            size: samples.sample_values,
            color: samples.otu_ids,
            colorscale: "Rainbow"
          },
          text: samples.otu_labels
        };

        // set the layout for the bubble plot
        var layout_1 = {
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1000
        };

        // creating data variable
        var data1 = [trace1];

        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_1);


        // The guage chart

        var data_g = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(washFreq),
          title: { text: `Weekly Washing Frequency ` },
          type: 'indicator',

          mode: 'gauge+number',
          gauge: { axis: { range: [null, 9] },
                    bar: {'color': "#337AB7"},
                   steps: [
                    { range: [0, 2], color: '#F0F8FF' },
                    { range: [2, 4], color: '#B0E0E6' },
                    { range: [4, 6], color: '#ADD8E6' },
                    { range: [6, 8], color: '#87CEEB' },
                    { range: [8, 9], color: '#B0C4DE' },
                  ]}

          }
        ];
        var layout_g = {
            width: 700,
            height: 600,
            margin: { t: 20, b: 40, l:100, r:100 }
          };
        Plotly.newPlot("gauge", data_g, layout_g);
    });
  }
//buildPlots();

// create the function for the change event
function optionChanged(id) {
    buildPlots(id);
    demoInfo(id);
}

//Function for the initial data rendering
function init() {
    // select dropdown menu
    var dropdown = d3.select("#selDataset");
    // read the data
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        buildPlots(data.names[0]);
        demoInfo(data.names[0]);
    });
}

init();
