
/**
 * Get the UTC offset of the user's local time zone
 *
 * @return {string} of the user's local time zone UTC offset, for example for example '+9:30' or '-4:00'
 */
function getCurrentUTCOffset() {
    const date = new Date();
    const sign = (date.getTimezoneOffset() > 0) ? '-' : '+';
    const offset = Math.abs(date.getTimezoneOffset());
    let hours = Math.floor(offset / 60);
    hours = (hours < 10 ? `0${hours}` : hours);
    return `${sign + hours}:00`;
}

window.addEventListener('load', function () {
    console.log("home page loaded");
    console.log(buildUrl(['home', 'get_user_time_zone']));
    //works
    const temp = 1234;
    $.getJSON({
        type: 'GET',
        // eslint-disable-next-line no-undef
        url: buildUrl(['home', 'get_user_time_zone']),
        data: {
            // eslint-disable-next-line no-undef
            csrf_token: csrfToken,
            temp,

        },
        success: function (response) {
            // Update page elements if the data was successfully saved server-side
            if (response.status === 'success') {
                const users_utc = response.data.utc_offset;
                const current_offset = getCurrentUTCOffset();
                // $('#time_zone_selector_label').attr('data-user_time_zone', response.data.user_time_zone_with_offset);
                // eslint-disable-next-line no-undef
                // displaySuccessMessage('Time-zone updated succesfully!!');

                // Check user's current time zone, give a warning message if the user's current time zone differs from systems' time-zone
                // const offset = getCurrentUTCOffset();
                if (users_utc !==current_offset) {
                //console.log(offset);
                // eslint-disable-next-line no-undef
                displayWarningMessage('The set time-zone on your profile does not match system time-zone. Please update to prevent any issues!');
                
                 }
            }
            else {
                console.log("error1");
                console.log(response);
                // eslint-disable-next-line no-undef
                // displayErrorMessage('Time-zone is not updated!');
            }
        },
        error: function (response) {
            // console.error('Failed to parse response from server!');
            console.log(response);
            // eslint-disable-next-line no-undef
            //displayErrorMessage('Failed to parse response from server!');
           
        },
    });
   
});