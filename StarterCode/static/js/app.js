// create the function to get the necessary data
function demogrphics(id) {
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get demographic data
        var demographicData = data.metadata;
        console.log(`demographicData: ${demographicData}`)

        // filter demographicData by id
        var subjectID = demographicData.filter(d => d.id.toString() === id)[0];
        console.log(subjectID)

        // select demogrphic panel in html code and empty panel for new Data
        var subjectInfo = d3.select("#sample-metadata");
        subjectInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}
demogrphics();
// Create function for plotting data (Bar, gauge, bubble)
function buildPlots(id) {
    // getting data from the json file
    d3.json("samples.json").then((data)=> {
        console.log(data)
        // Number of washes
        var washFreq = data.metadata.map(w => w.wfreq)
        console.log(`Wash Frequency: ${washFreq}`)
        //Filter "samples" by // ID
        var samples = data.samples.filter(s =>s.id.toString() === s.id)[0];
        console.log(samples)
        //Top 10
        var values = samples.sample_values.slice(0, 10).reverse();
        console.log(`Values: ${values}`)
        //Top 10 otu
        var topOTU = samples.otu_ids.slice(0, 10).reverse();
        console.log(`Top OTU: ${topOTU}`)
        // OTU OTU IDs
        var OTUids = topOTU.map(i => "OTU: " + i)
        console.log(`OTU IDs: ${OUTids}`)
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        // create trace variable for the plot
        var trace = {
            x: values,
            y: OTUids,
            text: labels,
            marker: {
              color: 'rgb(142,124,195)'},
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



    });
  }
buildPlots();
