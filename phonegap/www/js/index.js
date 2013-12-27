/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
    	this.bindEvents();
		$('.places-most-checkin').bind('expand', function () {
			$('.places-most-checkin ul').html('');
			$.getJSON("http://appdul/services/venues_trend.php", function(data){
				var venue_list = '';
				for( i = 0 ; i < data.length ; i++ ){
					var venue_id = data[i]['id'];
					var venue = '<li>' + 
							'<a class="venue_link" data-id="'+ data[i]['id'] +'">' +
							'<h3>' + data[i]['name'] + '</h3>' + 
							'<p>' + data[i]['categoryName'] + '<p>' + 
							'<span class="ui-li-count">' + data[i]['hereNowCount'] + '</span>' + 
							'</a>' + 
						'</li>';
					venue_list += venue;
				}
				$('.places-most-checkin ul').append(venue_list).listview('refresh');
			});
		});
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
       	document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
    }
};

$('.venue_link').live("click", function (){
	var venue_id = $(this).data("id");
	$.mobile.changePage("#page-venue-detail");
});