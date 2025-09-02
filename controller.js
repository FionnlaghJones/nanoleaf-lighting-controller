let authToken = localStorage.getItem("nc1_auth_token");
const version = "/api/v1/";
let controllerState = {};

$(document).ready(function () {
  // Add event hooks to buttons
  $("#identify").click(identifyController);
  $("#auth").click(getAuthToken);
  $("#getControllerState").click(getControllerState);
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
    }
  );
};
