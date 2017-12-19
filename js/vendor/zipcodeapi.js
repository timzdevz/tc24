jQuery(function($) {
    // IMPORTANT: Fill in your client key
    var clientKey = "js-25fmhqznOFbujp356d4ucm4OaY9R24llN1c0Zf912s0daAyygpPQYa02tlH2dIxq";

    var cache = {};
    var container = $(".zip-container");
    // var errorDiv = container.find("div.text-error");

    /** Handle successful response */
    function handleResp(data)
    {
        // Check for error
        if (data.error_msg)
            console.error(data.error_msg);

        else if ("city" in data)
        {
            // Set city and state
            container.find(".city-container").text(data.city);
        }
    }

    // Set up event handlers
    container.find("input[name='zip']").on("keyup change", function() {
        container.find(".city-container").empty();

        // Get zip code
        var zipcode = $(this).val();
        if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
        {

            // Check cache
            if (zipcode in cache)
            {
                handleResp(cache[zipcode]);
            }
            else
            {
                // Build url
                var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";

                // Make AJAX request
                jQuery.ajax({
                    "url": url,
                    "dataType": "json"
                }).done(function(data) {
                    handleResp(data);

                    // Store in cache
                    cache[zipcode] = data;
                }).fail(function(data) {
                    if (data.responseText && (json = $.parseJSON(data.responseText)))
                    {
                        // Store in cache
                        cache[zipcode] = json;

                        // Check for error
                        if (json.error_msg)
                            console.error(json.error_msg);
                    }
                    else
                       console.error('Request failed.');
                });
            }
        }
    }).trigger("change");
});