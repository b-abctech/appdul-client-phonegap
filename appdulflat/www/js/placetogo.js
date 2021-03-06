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
        $('.places-most-checkin').bind('expand', loadMostPlaceCheckin());
        $('.events-recommend').bind('expand', loadEventsRecommended());
        $('.now-showings').bind('expand', loadNowShowing());

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

$(document).ready(function() {
    $( "[data-role='footer']" ).toolbar();
});
$(document).on('click', '.venue_link', function(){ 
    $('.venue-detail-content').hide();
    var venue_id = $(this).data("id");
    $.mobile.changePage("#page-venue-detail");
    $.getJSON( host_service_url + "venue_detail.php?vid="+venue_id )
        .done(function(data){
            console.log('data loaded');
            $('.venue-name').html(data.name);
            $('.venue-photo').attr('src', data.imageURL);
            $('.venue-type').html(data.categoryName);
            $('.venue-opentime').html(data.opentime);
            $('.venue-detail').html(data.description);
            $('.venue-checkedin').html(data.checkinsCount);
            $('.venue-herenow').html(data.hereNowCount);
            //$('.venue-website a').attr('href',data.url);
            $('.venue-website a').html(data.url);
            $('.venue-detail-content').fadeIn(200);
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
    });
});

function loadMostPlaceCheckin(){
    // most checkin data ---------------------------------- 
    $('.places-most-checkin ul').html('');
    $.getJSON( host_service_url + "venues_trend.php")
        .done(function(data){
            if( data.length == 0 ) {
                $('.places-most-checkin .data-not-found').css('display','block');
            }else{
                $('.places-most-checkin .data-not-found').css('display','none');
                $('.list-places-container').html('');
                var venue_list = '';
                for( i = 0 ; i < data.length ; i++ ){
                    var venue = '<li>' + 
                            '<a class="venue_link" data-id="'+ data[i]['id'] +'">' +
                            '<h3>' + data[i]['name'] + '</h3>' + 
                            '<span>' + data[i]['categoryName'] + '<span>' + 
                            '</a>' + 
                        '</li>';
                    venue_list += venue;
                }
                $('.list-places').append(venue_list).listview('refresh');
            }
        })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                alert('Sorry, server connection problem');
    });
}

function loadEventsRecommended(){
    // event recommend ---------------------------------
    $('.events-recommend ul').html('');
    $.getJSON( host_service_url + "events_trend.php")
        .done(function(data) {
            if( data.length == 0 ) {
                $('.list-events-container').html('- There is no events recommend at a moment -');
                $('.list-events-container').addClass('data-not-found');
            }else{
                $('.list-events-container').html('');
                var event_list = '';
                for( i = 0 ; i < data.length ; i++ ){
                    var evt = '<li>' + 
                            '<a class="event_link" data-id="'+ data[i]['id'] +'">' +
                            '<img src="'+data[i]['imageThumbURL']+'" >' + 
                            '<h3>' + data[i]['name'] + '</h3>' + 
                            '</a>' + 
                        '</li>';
                    event_list += evt;
                }
                $('.list-events').append(event_list).listview('refresh');
            }
        })
        .fail(function( jqxhr, textStatus, error ){
            var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                $('.list-events-container').html('- Can\' connect to server -');
                $('.list-events-container').addClass('data-not-found');
    });
}

function loadNowShowing(){
    // event recommend ---------------------------------
    $('.now-showings ul').html('');
    $.getJSON( host_service_url + "showing_list.php")
        .done(function(data) {
            if( data.length == 0 ) {
                $('.list-showing-container').html('- There is no events recommend at a moment -');
                $('.list-showing-container').addClass('data-not-found');
            }else{
                $('.list-showing-container').html('');
                var event_list = '';
                for( i = 0 ; i < data.length ; i++ ){
                    var evt = '<li>' + 
                            '<a class="showing-link" data-id="'+ data[i]['id'] +'">' +
                            '<img src="'+data[i]['imageThumbURL']+'" >' + 
                            '<h3>' + data[i]['name'] + '</h3>' + 
                            '<p>' + data[i]['type'] + '</p>' + 
                            '</a>' + 
                        '</li>';
                    event_list += evt;
                }
                $('.list-nowshowing').append(event_list).listview('refresh');
            }
        })
        .fail(function( jqxhr, textStatus, error ){
            var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                $('.list-showing-container').html('- Can\' connect to server -');
                $('.list-showing-container').addClass('data-not-found');
    });    
}
