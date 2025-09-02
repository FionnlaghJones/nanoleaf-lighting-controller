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
