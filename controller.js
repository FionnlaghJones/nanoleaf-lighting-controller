let authToken = localStorage.getItem("nc1_auth_token");
const version = "/api/v1/";
let controllerState = {};

$(document).ready(function () {
  // Add event hooks to buttons
  $("#identify").click(identifyController);
  $("#auth").click(getAuthToken);
  $("#getControllerState").click(getControllerState);
  $("#toggle").click(toggleControllerPower);
});

getAuthToken = function () {
  const endpoint = "new";
  let controllerAddress = $("#controllers").find(":selected").val();
  $.post(`${controllerAddress}${version}${endpoint}`, {}).done(function (
    response
  ) {
    console.log("Response: ", response);
    // TODO: move auth token to class property
    authToken = response.auth_token;
    localStorage.setItem("nc1_auth_token", authToken);
  });
};

identifyController = function () {
  const endpoint = "identify";
  let controllerAddress = $("#controllers").find(":selected").val();
  $.ajax({
    url: `${controllerAddress}${version}${authToken}/${endpoint}`,
    method: "PUT",
    data: {},
    success: function (response) {
      console.log("Response: ", response);
    },
    error: function (xhr, status, error) {
      console.error("Error: ", error);
    },
  });
};

getControllerState = function () {
  const endpoint = "state";
  let controllerAddress = $("#controllers").find(":selected").val();
  $.get(`${controllerAddress}${version}${authToken}/${endpoint}`, {}).done(
    function (response) {
      console.log("Response: ", response);
      controllerState = response;
      $("#powerIndicator").text(controllerState.on.value ? "On 🟢" : "Off 🔴");
    }
  );
};

toggleControllerPower = function () {
  const endpoint = "state";
  let controllerAddress = $("#controllers").find(":selected").val();

  const setPowerState = function (powerState) {
    $.ajax({
      url: `${controllerAddress}${version}${authToken}/${endpoint}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: powerState,
      success: function (response) {
        console.log("Response: ", response);
      },
    });
  };

  // TODO make use of existing saved state
  $.get(`${controllerAddress}${version}${authToken}/${endpoint}`, {}).done(
    function (state) {
      console.log(state);
      if (state.on.value === true) {
        setPowerState('{"on":{"value":false}}');
      } else {
        setPowerState('{"on":{"value":true}}');
      }
      $("#powerIndicator").text(!state.on.value ? "On 🟢" : "Off 🔴");
      //TODO: change this to be driven by the actual live value.
    }
  );
};
