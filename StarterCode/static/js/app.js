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



    });
  }
buildPlots();
