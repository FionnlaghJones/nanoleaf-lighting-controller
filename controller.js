let authToken = "";
const version = "/api/v1/";

$(document).ready(function () {
  $("#identify").click(identifyController);
  $("#auth").click(getAuthToken);
});

getAuthToken = function () {
  const endpoint = "new";
  let controllerAddress = $("#controllers").find(":selected").val();
  $.post(`${controllerAddress}${version}${endpoint}`, {}).done(function (
    response
  ) {
    console.log("Response: ", response);
    authToken = response.auth_token;
  });
};

identifyController = function () {
  const endpoint = "identify";
  let controllerAddress = $("#controllers").find(":selected").val();
  $.put(`${controllerAddress}${version}${authToken}/${endpoint}`, {}).done(
    function (response) {
      console.log("Response: ", response);
      authToken = response.auth_token;
    }
  );
};
